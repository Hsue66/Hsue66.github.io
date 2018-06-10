---
layout: post
title: Stack & Queue
tags: [Data Structure]
author: hsue66 
---

> `열혈 자료구조`를 다시 읽으며 공부하면서 정리하는 내용


스택 (Stack)
--------

![스택](/assets/img/postimg/21stack.png)

특징
- 먼저 들어간 것이 나중에 나오는(LIFO : Last in First out) 자료구조  

기본연산
- push : 데이터 삽입  
- pop : 데이터 추출 + 삭제
- peek : 데이터 확인만(삭제X)

배열기반, 연결리스트 기반 모두 구현가능




큐 (Queue)
------------

![큐](/assets/img/postimg/21queue.png)

특징
- 먼저 들어간 것이 먼저 나오는(FIFO : First in First out) 자료구조

기본연산
- enqueue : 데이터 넣기   
- dequeue : 데이터 빼기 + 삭제   
- peek : 스택과 동일  

OS에서 자주 쓰임(process, thread 관리시)  

배열기반, 연결리스트 기반 모두 구현 가능  

cf. 배열기반일 경우 발생하는 문제  
![문제](/assets/img/postimg/21queueP.png)
enqueue & dequeue과정에서 배열 빈공간이 많아질 수 있음.  
(왜냐면, enqueue,dequeue 모두 같은방향으로 이동하기 때문에)

해결방안 : *원형큐* 사용
![해결](/assets/img/postimg/21cirqueue.png)

but, 원형큐의 문제  
![문제](/assets/img/postimg/21cirP.png)
FULL과 EMPTY가 구분이 안됨    

→ Front위치를 공백으로 해서 구분함  
![해결](/assets/img/postimg/21cirS.png)
EMPTY인 경우, Front = Rear  
FULL인 경우, Front = Rear + 1




### 덱 (Deque)
![덱](/assets/img/postimg/21deque.png)
double ended queue  
양쪽 방향에서 넣고 빼고 가능(양방향 연결리스트 사용)
