---
layout: post
title: Process Scheduling
tags: [Operating System]
---


> 운영체제 이론 정리 포스트들은 [서울대학교 평생교육원사이트](http://snui.snu.ac.kr/ocw/index.php?mode=view&id=625)에 올라온 홍성수교수님의 강의와 공룡책(Operating System concepts)을 참고하여 정리함


Process Scheduling
-------------------

* 목표 : 프로세서가 CPU가 공평하게 사용할 수 있도록 하는 것

* 제약사항  
- FAIR (app specific함, 원하는 목적에 따라 공평함의 기준은 달라질 수 있음)  
- CPU protection (모든 app이 갖추어야하는 기준)

* 설계 방식  
Scheduling policy와 dispatching mechanism을 구분하여 설계  
Scheduling policy : 다음에 수행할 프로세스를 선택하는 정책
dispatching mechanism : 프로세스간에 CPU를 넘겨주는 방법  
구분하여 설계하는 이유는 dispatching mechanism은 Scheduling policy에 의존적이지 않기 때문에 분리할 수 있음



Dispatching Mechanism
----------------------

### Dispatcher  
```
while(1){
	프로세서 어느정도 실행
	프로세서 중단 후 상태 저장
	다른 프로세서의 상태 로드
}
```
dispatcher의 동작은 active한 것 같지만 **실제로 OS는 passive한 상태!**  
Q) 그렇다면 dispatcher가 active하려면 어떻게?  
![interleaving](/assets/img/postimg/115interleave.png)
User process와 OS가 interleaving하게 동작해야함

Q) User process와 OS는 어떻게 전환되는가?  
User mode와 Kernel mode간의 mode change! **→ interrupt** (HW 메커니즘)  
> * kernel mode (supervisor mode, system mode, privileged mode)
:	시스템에 접근할 모든 권한을 가지고 있는 모드(mode bit : 0)  
* user mode
:	제한된 메모리 접근과 명령어가 사용가능한 모드(mode bit : 1)  
두 mode는 **PSW (Process Status Word register)**안에 mode bit로 구분  
mode bit는 interrupt 발생시 0으로 set  
cf. user program내 subroutine은 mode change 필요없음!

> dispatcher 수행 == Kernel 권한  
user process 수행 == User 권한 


cf. System Call
:	SW에 의해 발생된 interrupt, 운영체제의 커널이 제공하는 서비스를 User program이 이용하기위한 interface


# ING #

