---
layout: post
title: AOJ - BOARDCOVER 
tags: [Algorithm]
author: hsue66 
---

> 출처 [AOJ](https://algospot.com/judge/problem/read/BOARDCOVER)

게임판 덮기 
--------------
### 문제
![예시](/assets/img/postimg/aojBp.png)
H * W 크기의 게임판이 있습니다. 게임판은 검은 칸과 흰 칸으로 구성된 격자 모양을 하고 있는데 이 중 모든 흰 칸을 3칸짜리 L자 모양의 블록으로 덮고 싶습니다. 이 때 블록들은 자유롭게 회전해서 놓을 수 있지만, 서로 겹치거나, 검은 칸을 덮거나, 게임판 밖으로 나가서는 안 됩니다. 위 그림은 한 게임판과 이를 덮는 방법을 보여줍니다.

게임판이 주어질 때 이를 덮는 방법의 수를 계산하는 프로그램을 작성하세요.
### 입력
입력의 첫 줄에는 테스트 케이스의 수 C (C <= 30) 가 주어집니다. 각 테스트 케이스의 첫 줄에는 2개의 정수 H, W (1 <= H,W <= 20) 가 주어집니다. 다음 H 줄에 각 W 글자로 게임판의 모양이 주어집니다. # 은 검은 칸, . 는 흰 칸을 나타냅니다. 입력에 주어지는 게임판에 있는 흰 칸의 수는 50 을 넘지 않습니다.
### 출력
한 줄에 하나씩 흰 칸을 모두 덮는 방법의 수를 출력합니다.
### 예제
입력  
>3   
3 7   
#.....#   
#.....#   
##...##   
3 7   
#.....#   
#.....#   
##..###   
8 10   
##########   
#........#   
#........#   
#........#   
#........#   
#........#   
#........#   
##########   

출력  
> 0    
2  
1514  


* * *
### 범위체크
보드판에 배치하는것이라 연산이 따로 없음
### 풀이
빈공간에 아래 그림과 같은 패치를 다 시도해봐야함  
![예시](/assets/img/postimg/aojB.png)
패치를 하나놓고 남는 공간다시 재귀로 패치 놓기 반복  
중복된 경우를 세는 것을 없애기 위해 왼쪽→오른쪽, 상단→하단으로 채우는것으로 방향 고정하기!  
빈틈없이 덮이면 카운트 증가시키기  
+ 절대 덮지 못하는 경우(= 빈공간의 3의배수가 아닌 경우)는 탐색하지 말기! 
### 코드
[code](https://github.com/Hsue66/Algo/blob/master/BOARDCOVER/nboard.cpp)

```cpp
#include<cstdio>
#include<vector>
#include<iostream>

using namespace std;

int Board[21][21];
int H,W;
long long Cnt;
vector<pair<pair<int,int>,pair<int,int> > > patch;


void cover(){
	int x,y;
	int flag = 1;
	for(int i=0; i<H; i++){
		for(int j=0; j<W; j++){
			if(Board[i][j] == 0){
				x = i;
				y = j;
				flag = 0;
				break;
			}		
		}
		if(flag==0)
			break;

	}

	if(flag)
		Cnt++;
	else{
		for(int t=0; t<4; t++){
			int tx1 = x+patch[t].first.first;
			int ty1 = y+patch[t].first.second;
			int tx2 = x+patch[t].second.first;
			int ty2 = y+patch[t].second.second;
			if((0<= tx1 && tx1 <H) && (0<= ty1 && ty1 <W) &&
			(0<= tx2 && tx2 <H) && (0<= ty2 && ty2 <W) &&
			(Board[tx1][ty1] == 0) && (Board[tx2][ty2] == 0)){
				Board[x][y] = Board[tx1][ty1] = Board[tx2][ty2] = 1;
				cover();
				Board[x][y] = Board[tx1][ty1] = Board[tx2][ty2] = 0;
			}
		}
	}
}


int main(){
	int testcase;
	scanf("%d",&testcase);
	patch.push_back(make_pair(make_pair(1,0),make_pair(1,1)));
	patch.push_back(make_pair(make_pair(0,1),make_pair(1,0)));
	patch.push_back(make_pair(make_pair(0,1),make_pair(1,1)));
	patch.push_back(make_pair(make_pair(1,0),make_pair(1,-1)));

	while(testcase--){
		scanf("%d%d",&H,&W);
		Cnt = 0;
		int temp =0;
		for(int i=0; i<H; i++){
			for(int j=0; j<W; j++){
				char ch;
				cin>>ch;
				if(ch == '#')
					Board[i][j] = 2;
				else{
					temp++;
					Board[i][j] = 0;
				}
			}
			cin.clear();
		}
		
		if(temp%3==0)
			cover();
		printf("%lld\n",Cnt);
	}
}
```
### 복잡도
$$O(4^{50 \over 3})$$
