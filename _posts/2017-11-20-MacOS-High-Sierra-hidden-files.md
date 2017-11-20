---
layout: post
title: MacOS High Sierra 숨김파일 표시
tags: [MacOS]
author: hsue66 
---

> IOS개발하면서 simulator에 있는 data를 보려고하다가 찾게된 방법이다.
참고로 simulator경로는 `~/Library/Developer/CoreSimulator/Devices/`+ 자기가 사용중인 device명

숨김파일 보는 방법
------------
`command`+`space`로 spotlight에서 terminal실행
![spotlight](/assets/img/postimg/spotlight.png)

terminal에 명령어 입력
```
defaults write com.apple.finder AppleShowAllFiles YES
```
![terminal](/assets/img/postimg/term.png)

다음과 같이 숨김파일들이 보이게 된다.
![result](/assets/img/postimg/hiddenfiles.png)


보여진 숨김파일 다시 안보이게 하는 방법
---------------

terminal에 명령어 입력
```
defaults write com.apple.finder AppleShowAllFiles NO
```
숨김파일들이 다시 안보이게 된다.
![result](/assets/img/postimg/hide.png)

되도록이면 작업한 후에 숨김파일로 돌려놓는게 좋다. 
의도치않게 설정파일들이 수정되면 곤란해질 수 있으니!

