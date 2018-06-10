---
layout: post
title: AOJ - PICNIC 
tags: [Algorithm]
author: hsue66 
---

> 출처 [AOJ](https://algospot.com/judge/problem/read/PICNIC)

소풍
--------------
### 문제
안드로메다 유치원 익스프레스반에서는 다음 주에 율동공원으로 소풍을 갑니다. 원석 선생님은 소풍 때 학생들을 두 명씩 짝을 지어 행동하게 하려고 합니다. 그런데 서로 친구가 아닌 학생들끼리 짝을 지어 주면 서로 싸우거나 같이 돌아다니지 않기 때문에, 항상 서로 친구인 학생들끼리만 짝을 지어 줘야 합니다.

각 학생들의 쌍에 대해 이들이 서로 친구인지 여부가 주어질 때, 학생들을 짝지어줄 수 있는 방법의 수를 계산하는 프로그램을 작성하세요. 짝이 되는 학생들이 일부만 다르더라도 다른 방법이라고 봅니다. 예를 들어 다음 두 가지 방법은 서로 다른 방법입니다.

(태연,제시카) (써니,티파니) (효연,유리)  
(태연,제시카) (써니,유리) (효연,티파니)
### 입력
입력의 첫 줄에는 테스트 케이스의 수 C (C <= 50) 가 주어집니다. 각 테스트 케이스의 첫 줄에는 학생의 수 n (2 <= n <= 10) 과 친구 쌍의 수 m (0 <= m <= n*(n-1)/2) 이 주어집니다. 그 다음 줄에 m 개의 정수 쌍으로 서로 친구인 두 학생의 번호가 주어집니다. 번호는 모두 0 부터 n-1 사이의 정수이고, 같은 쌍은 입력에 두 번 주어지지 않습니다. 학생들의 수는 짝수입니다.
### 출력
각 테스트 케이스마다 한 줄에 모든 학생을 친구끼리만 짝지어줄 수 있는 방법의 수를 출력합니다.
### 예제
입력  
>3  
2 1  
0 1  
4 6  
0 1 1 2 2 3 3 0 0 2 1 3  
6 10  
0 1 0 2 1 2 1 3 1 4 2 3 2 4 3 4 3 5 4 5  

출력  
> 1  
3  
4  


* * *
### 범위체크
최대 짝만드는 횟수 = $$9 * 7 * 5 * 3 * 1 = 945 < INT$$
### 풀이
친구사이를 그래프로 표현해놓고 짝만드는 경우의 수를 구함  
{2명씩 짝만들고 남은 사람들 중에 2명씩 짝 만들고} 반복  
![동작예시](/assets/img/postimg/aojP.png)
중복을 방지하기 위해 checked배열을 생성하여 짝이 된 애들표시  

### 코드
[code](https://github.com/Hsue66/Algo/blob/master/PICNIC/newp.cpp)
```cpp
#include<cstdio>
#include<vector>

using namespace std;

int numOfs;
vector<int> G[11];
int checked[11];
int cnt;

void makePair(){
	int flag = -1;
	for(int i=0; i<numOfs; i++){
		if(checked[i] != 1){
			flag = i;
			break;
		}
	}

	int from, to;
	if(flag == -1)
		cnt++;
	else{
		from = flag;
		checked[from] = 1;
		for(int i=0; i<G[from].size(); i++){
			int to = G[from][i];
			if(checked[to] != 1){
				checked[to] = 1;
				makePair();
				checked[to] = 0;
			}
		}
		checked[from] = 0;
	}

}

int main(){
	int testcase;
	scanf("%d",&testcase);
	while(testcase--){
		int M;
		scanf("%d%d",&numOfs,&M);
		fill_n(checked,numOfs,0);
		cnt = 0;

		while(M--){
			int tx,ty;
			scanf("%d%d",&tx,&ty);
			G[tx].push_back(ty);
			G[ty].push_back(tx);
		}
		
		makePair();
		printf("%d\n",cnt);

		for(int i=0; i<numOfs; i++)
			G[i].clear();
	}
}
```
### 복잡도

