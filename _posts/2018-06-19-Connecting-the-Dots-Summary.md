---
layout: post
title: 논문정리- Connecting the Dots Between News Articles
tags: [논문]
author: hsue66 
---

> [connecting the dots between news articles](http://www.cs.huji.ac.il/~dshahaf/kdd2010-shahaf-guestrin.pdf) 정리 

Problem Definition
------------
* Goal : given two news articles, this system automatically finds a coherent chain linking together
* Input : a set of article
* Output : a coherent chain


Main Idea
----------
> 본문은 chain의 점수를 매기는 법과 좋은 chain을 찾는 법으로 나누어 설명함. chain이 있을 때 점수를 매기는 방법을 정의하고 이 논문의 input은 link가 없는 상태이므로 chain을 만드는 법을 설명하는 것임.

1. Scoring a chain
> 어떤체인이 좋은체인인지, 어떻게 연관성을 표현할지, 제약조건들이 무엇인지, link가 없는 상황에서 influence는 어떻게 측정하는지 순으로 설명  

- What is a good chain
![good chain](/assets/img/postimg/ctd-gc.png)
좌측과 우측 모두 A1,B1과 A6,B6가 동일함(동일한 start, end article)  
좌측은 shortest-path방식을 이용해서 A1 → A6까지 기사들은 연결한 것이고  
우측은 coherent하게 연결한 것  
좌측의 경우는 비슷한 기사를 연결했지만 화살표가 나타내는 것처럼 단어의 stretch가 짧고 global coherence가 없음. 
그에 비해 이 논문이 목표로 하는 것은 우측과 같은 단어의 긴 stretch 형태로 global하게 연관이 된 것임.   
따라서 **good chain**이란 **coherence가 높은 chain**이라고 생각할 수 있다.

- Formalizing story coherence  
Coherence는 chain($${d_1},...,{d_n}$$)이 주어졌을 때, word activation pattern으로 예측할 수 있음.    
Try1) 연속된 두 article에서 단어가 나타날때마다 점수매기기  
$$Coherence({d_1},...,{d_n}) = \sum_{i=1}^{n-1}\sum_{w}1(w \in {d_i} \cap {d_{i+1}})$$  * 단점  
weak link : Chain은 weakest link만큼만 ... → ‘broken chain’이 될 가능성 존재  
Try2) sum대신에 the minimal transition score를 고려하기
$$ Coherence({d_1},...,{d_n}) = \min_{i=1...n-1}\sum_{w}1(w \in {d_i} \cap {d_{i+1}}) $$

2. Find a good chain
-------------------


