---
layout: post
title: Process Concept
tags: [Operating System]
---


Process
---------

OS위에서 program을 실행시키고 자원을 할당는 주체  
내부동작을 작게 세분화한 형태

> cf. SW복잡도 상승(Software Crisis)의 해결방안  
Abstraction & Decomposition	
* Abastraction
:	내부의 구체적인 동작을 숨기고 단순한 기능만 표현하는 것
* Decomposition
:	복잡한 문제를 여러 단순한 문제로 나누어 처리하는 것


정의  
– Program in Execution  
&nbsp;&nbsp;&nbsp;수행중인 program  

– Process state 에서 실행되는 execution stream  

process state(=context)
:	Program 수행에 영향을 줄 수 있는 값들  
* Memory context  
code segmentation, data segmentation(Program의 전역변수), stack segmentation(Program의 지역변수), heap   
* Hardware context  
&nbsp;&nbsp;&nbsp;- CPU registers, I/O registers  
* System context  
&nbsp;&nbsp;&nbsp;- process table, open file table, page table  

execution stream
:	process가 지금까지 수행한 모든 명령어들의 순서


 **Program ≠ Process**  
   Program : 저장장치에 저장된 passive한 매체  
   Program이 **실행되면** Process

참고

||Multiprogramming | Multiprocessing|
|-|:-----:|:-----:|
|<td colspan=2> 여러개 active
|| Memory관점 | CPU관점|
||메모리 내에 여러개의 프로세스 존재 | CPU가 여러 프로세스에 의해 multiplexing |

Uniprogramming : 단 한개의 active한 Process를 수행



Q. Multiprocessing은 반드시 Multiprogramming?  
현재는 YES - 메모리에 여러 프로세스를 올리고 빠르게 Multiprocessing  
과거에는 NO - Uniprogramming으로 하나만 올린 후 swapping

Swapping
:	메모리 부족문제를 해결하기 위해 CPU를 사용하지 않는 프로세스 데이터를 다른 저장장치로 내보내고 사용할 프로세스 데이터를 메모리로 로드


