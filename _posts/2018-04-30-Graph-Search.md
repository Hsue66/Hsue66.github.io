---
layout: post
title: Graph Search
tags: [Data Structure]
author: hsue66 
---

> 출처: 쉽게배우는 알고리즘(한빛미디어), C++ 자료구조론(인피니티북스)

Graph Search
--------------
> 사람은 그래프를 한번에 파악하고 문제를 해결할 수 있지만, 컴퓨터는 그래프를 정확하게 차례대로 방문하는 과정이 필요함   

### 깊이우선탐색(Depth First Search)
  갈수 있는 만큼가고, 없으면 이전 정점으로 돌아와 탐색. **스택**사용 
![문제](/assets/img/postimg/graphD.png)

### 너비우선탐색(Breadth First Search)  
  현재 위치에서 갈 수 있는 곳 모두가고, 새 위치에서 동일하게 탐색. **큐**사용 
![문제](/assets/img/postimg/graphBFS.png)

### Flood Fill  
  어떤 위치와 연결된 모든 위치를 찾는 알고리즘(DFS의 일종. multi dimensional array에서 동작)
![GIF](https://upload.wikimedia.org/wikipedia/commons/8/89/Recursive_Flood_Fill_8_%28aka%29.gif)	
