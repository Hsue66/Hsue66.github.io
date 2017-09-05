---
layout: post
title: What is Process
tags: [Operating System]
---

Process
-------
a program in execution, active

registers, program counter text section, data section, stack, heap 포함

  * text section : program code
  * program counter : represent current activity
  * data section : contain global variables
  * stack : contain temporary data
  * heap : memory during process runtime

Program
-------
excutable file, passive

When program is loaded into memory, It becomes Process.


> Process 2개 사용시 , 각각 text section, data, heap, stack 가짐
> Process A가 특정 주소 값을 변경해도 Process B는 영향을 받지 않음.
