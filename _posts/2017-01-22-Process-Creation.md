---
layout: post
title: Process Creation & Termination
tags: [Operating System]
---


> 운영체제 이론 정리 포스트들은 [서울대학교 평생교육원사이트](http://snui.snu.ac.kr/ocw/index.php?mode=view&id=625)에 올라온 홍성수교수님의 강의와 공룡책(Operating System concepts)을 참고하여 정리함


Abstraction and Demonstration
-------------------

Complexity문제를 해결하기 위해 Abstraction과 Decomposition이 함께 사용됨.

### Layered Architecture
![Architecture](/assets/img/postimg/122layer.png)

API(Application Programming Interface)
:	Layer간 통신을 위해 정의된 호출규약

### Layering Principle  
위의 계층은 아래 계층의 기능만 사용가능, 반대는 불가능  
(만약 반대가 가능하면 유연성이 ↓




Process Creation & Termination
--------------------------------

### Process Creation  
1. code와 data를 메모리에 로드
2. 비어있는 call stack생성(heap도)
3. Process Control Block 생성과 초기화
4. process를 대기 큐에 넣기

### Process Creation in Unix
0번 프로세스만 생성, 나머지는 0번을 fork해 clone하여 사용  
* 부모 프로세스(Parent process)
:	process clone을 하는 기존 process  
* 자식 프로세스 (Child process)
:	부모 프로세스로 부터 만들어진 프로세스  

fork()하면  
1. 부모 프로세스를 중지하고 현재 상태를 저장
2. code, data, stack, PCB를 복사
3. 새로운 PCB를 대기 큐에 추가
Q) 이 과정만 수행했을 때 생기는 문제는?  
fork된 프로세스말고 다른 프로세스를 수행할 수 없다.  
→ **exec()**수행 (override하여 새 프로그램으로 동작한다)


fork 과정 그림
![cycle](/assets/img/postimg/122cycle.png)
fork()하면 parent는 child가 수행종료할 떄까지 wait()하고  
child는 fork()된 후 exec하여 프로그램을 실행하다가 exit()으로 resource를 반환함. exit 맞게 되었는지 여부를 code로 가지고 있다가 wait하고 있는 parent에게 signaling

cf. zombie state  
exit 마친 프로세스, 모든 자원 반환되고 exit status자료구조만 있고 parent가 가져가길 기다리는 상태

cf. Shell or CLI(Command Line Interpreter)  
사용자가 입력한 명령어를 받아들여 새로운 프로세스를 수행시키는 프로그램



```c
int main()
{
	pid_t pid;

	/* fork a child process */
  	pid = fork();
	
 	if(pid < 0) { /* error occured */
		fprintf(stderr, "Fork Failed");
		return 1;
	}
	else if(pid == 0) {	/* child process */
		execlp("/bin/ls", "ls", NULL);	
	}
	else { 	/* parent process */
		/* parent will wait for the child to complete */
		wait(NULL);
		printf("Child Complete");
	}
	return 0;
}
```
> pid = fork()에서
child에게는 return 값이 0으로 들어가고  
parent에게는 child의 pid가 들어감  
에러시에는 음수  

코드 결과 : child는 ls override, parent는 child종료까지 wait  

Q) child는 생성된 후 어디서부터 수행되는가?  
fork()다음(왜냐하면 parent가 그대로 복사되므로 pc값도 복사)

Q) process는 한번에 하나 생성되는가?  
wait들어가기전에 child더 만들 수도 있음. 위 코드는 예시임.



**그런데 왜 이 방법을 사용할까?**  
(copy하고 override하는 과정이 비효율적인거 같은데...)  

Process간 통신 어떻게 할것인가? 고민  - memory protection때문에 직접적금할 방법이 없음  
→ **Parent-Child관계**는 가능  
ex)
```
foo(){
	fd = open("pipe");
	if(fork() == 0)
		read(fd, ...);		/* child */
	else
		write(fd, ...); 	/* parent */
}
```

통신의 편리성 떄문에 사용하게된 방법이라고 생각할 수 있음

비효율적인 문제 해결  
COW (Copy on Write) 사용 - fork할때 복사하지 않고, data segment에 새 값이 쓰일때 복사(보통 그전에 exec함)


### Process Termination
* exit()
:	OS로 할당된 resource 해제  
* abort()
:	동작이 잘못되어 Parent가 kill하여 강제종료
