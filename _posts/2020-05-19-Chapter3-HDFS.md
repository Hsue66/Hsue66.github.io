# HDFS
### 목차  
[ 1. What is HDFS? ](##1.-what-is-hdfs?)  
[ 2. Architecture of HDFS ](##2.-architecture-of-hdfs)  
[ 3. Read & Write ](##3.-read-&-write)  
[ 4. HDFS Federation ](##4.-hdfs-federation)  
[ 5. HDFS High Availability ](##5.-hdfs-high-availability)

## 1. What is HDFS ?
HDFS (Hadoop Distributed File System)  
-------------------------------------

> 가장 효율적인 데이터처리 패턴은 한번쓰고 여러번 읽는 것  

하둡이 제공하는 분산 File System  
#### 특징
* 매우 큰 File : MB, GB, TB ... even PB
* 데이터 접근 by Streaming : dataset생성 or 복사 후 분석 수행
* 범용HW : 고가,신뢰도 높은 HW X &rarr; 장애대응 중요

#### HDFS 비적합분야
* 빠른 응답시간 : HDFS는 높은 처리량을 위해 응답시간 희생
* 많은양의 작은 파일 : File수 &propto; Namenode의 메모리 용량
* 다중 Writer, File임의 수정 : HDFS는 단일 Writer (3.0이전까지) / 임의 위치 수정불가

## 2. Architecture

### * What is Block in HDFS ?
한번에 읽고 쓸수 있는 데이터의 최대량. **128MB**  
HDFS File을 특정블록크기의 chunk로 분할 후 각 chunk를 독립적으로 저장.  
![f2c](/assets/img/postimg/f2c.png)

cf. Disk Block size : 516B
#### Block size 큰 이유 : 탐색 비용 최소화
block 크기 &uarr;  &rarr;  시작점 탐색시간 &darr; == data 전송시간 확보 가능  
+&alpha; ) 전송시간 향상 &rarr; block 크기 증가

#### Block추상화 장점
* 단일 File크기 &gt; 단일 디스크용량 가능  
  &because; 한 File 구성하는 block이 한 Disk에 저장될 필요 X
* Storage Sub System 단순화  
  &because; Distribute System 장애유형 다양 &Rightarrow; 단순화 중요  
  & Block은 단지 data chunk라서 metadata와 분리 가능  
* 복제구현에 적합 (fault tolerance와 availability를 위해 중요)  
  Block을 다수의 머신에 복제  
  장애발생 시 ) 다른 block이용 & 다른복사본으로 복사 (복제계수 정상유지)

#### Block Caching : Off-heap Block Cache
  빈번하게 접근하는 block file 명시적으로 Caching  
  default ) 하나의 Datanode에 caching. (File단위로도 설정가능)

Master-Worker pattern
---------------------------
1개의 Namenode - 다수의 Datanode

#### Namenode
File System의 namespace관리  
File System Tree와 해당 Tree에 포함된 File, Directory에 대한 metadata유지.  
&forall; block이  어느 노드에 존재하는지 파악. but Disk에 영속적 저장 X (시스템시작시 위치정보 재구성)   
**metadata종류**
- namespace image : HDFS의 namespace (Directory명, File명, 상태정보 등) 와 파일에 대한 블록 맵핑정보 저장하는 File
- edit log : HDFS의 metadata에 대한 모든 변화를 기록하는 log file

#### Datanode
block저장하고 탐색, 저장한 blk목록을 주기적으로 NN에 보고.

### Namenode 장애 복구 기능
> NN 장애시 &Rightarrow; File System 동작 X

1. File 백업  
local, 원격 NFS마운트 2곳에 동시 백업, 동기화되고 Atomic하게 수행.
1. Secondary Namenode운영  
Secondary NN 역할   
 - edit log 너무 커지지 않도록, 주기적으로 namespace image + edit log &rarr; new namespace image생성   
 - 별도의 물리머신에서 수행 (&because; CPU와 NN만큼의 메모리 사용)
 - namespace 복제본 보관을 통해 장애 대비 (but, 시간차로 손실 불가피)  
  NFS에 저장된 주 NN File을 보조 NN에 복사 &rarr; new namespace image생성 &rarr; 새로운 주 NN에 복사 후 실행


## 3. Read & Write
File Read
---------------------------
![3read](/assets/img/postimg/3read.png)  
1. Client가 open()호출하여 파일 열기  
2. DFS는 파일 첫 blk위치 파악을 위해 NN호출 (by RPC)   
NN은 해당 blk 복제본 있는 DN주소 return (Client와 가까운 순으로 DN정렬)
DFS는 FSDataInputStream return, FSDataInputStream은 DFSInputStream(DN,NN의 I/O관리) 래핑
3. Client가 read()호출
4. DFSInputStream이 가장 가까운 DN연결  
해당 Stream에 대해 read반복호출 &rarr; data전송
5. blk끝 도달시, DFSInputStream은 해당 연결 닫고 다음blk DN 찾기(NN호출)
6. 모든 blk읽기 끝나면, Client는 FSDataInputStream close() 호출  

#### Read 중 통신장애 발생 시  
DFSInputStream아래 동작 수행
- 해당 blk 저장된 다른 DN과 연결시도
- 장애 발생 DN기억 &rarr; 불필요한 재시도 방지
- DN에서 전송된 data checksum 검증  
if 손상시 ) 다른 blk try & 손상 blk정보 NN에 보고

#### 해당 설계 이점
- Data Traffic고르게 분산 &Rightarrow; 동시 실행되는 Client수 증가 가능
- NN은 데이터를 저장,전송하는 역할 맡지 않음 &Rightarrow; 병목현상 거의 발생 X

### * Network Topology & Hadoop
전체 Network를 하나의 Tree로 생각.  
두 노드의 거리 = &sum; 가장 가까운 공통조상과의 거리  
Tree의 단계 : 데이터센터 &supset; 랙 &supset; 노드  
가용대역폭 : 동일노드 > 동일 랙 다른노드 > 동일 데이터센터 내 다른랙의 노드 > 다른 데이터 센터에 있는 노드  
![3read](/assets/img/postimg/3dist.png)  
$$distance(d_1/r_1/n_1,d_1/r_1/n_1) = 0$$
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$ 
Hadoop은 자동으로 Network Topology인식 X, default ) Network 단일수준 계층 (&forall;노드 &subset; 단일 랙 &subset; 단일 데이터센터)

## 4. HDFS Federation
## 5. HDFS High Availability
