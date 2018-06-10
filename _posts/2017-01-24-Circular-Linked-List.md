---
layout: post
title: Circular Linked List & Doubly Linked List
tags: [Data Structure]
author: hsue66 
---

> `열혈 자료구조`를 다시 읽으며 공부하면서 정리하는 내용


원형연결리스트 (Circular Linked List)
--------

단순연결리스트 
![단순연결리스트](/assets/img/postimg/124linked.png)

원형연결리스트 
![원형연결리스트](/assets/img/postimg/124circular.png)

특징
- 리스트의 마지막 노드가 첫번째 노드를 가리킴
- head, tail 두 방향 모두 추가 가능

|head에 추가 | tail에 추가|
|:----------:|:-------------:|
| head가 가리키는 노드 변화 | head가 가리키는 노드 유지|
| ![head](/assets/img/postimg/124head.png) | ![tail](/assets/img/postimg/124tail.png) |

공통점 : 두 경우 모두 노드 연결 순서는 1 → 2 → 3 → 4 → 5로 동일

head, tail의 차이가 존재하지 않기 때문에 둘중 하나만 존재해도됨

### 변형된 원형연결리스트
tail만 사용하여 표현한 원형연결 리스트
![change](/assets/img/postimg/124changed.png)
tail = tail  
head = tail → next



양방향연결리스트 (Doubly Linked List)
------------------
![양방향연결리스트](/assets/img/postimg/124doubly.png)
양쪽 방향으로 이동가능

