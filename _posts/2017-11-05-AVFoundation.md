---
layout: post
title: AVFoundation
tags: [IOS]
author: hsue66 
---


AVFoundation
------------
> AVFoundation에 대해 공부하며 작성한 글이므로 잘못된 사항이 있을 수 있습니다. 보다 정확한 정보는 [Apple developer 사이트 AVFoundation](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/AVFoundationPG/Articles/00_Introduction.html#//apple_ref/doc/uid/TP40010188-CH1-SW3)를 참고해주세요.

AVFoundation이란 Time based audiovisual media를 실행하거나 제작할 수 있는 프레임 워크

다음과 같은 작업을 할 수 있다.
- examine, create, edit or reencode media files
- get input streams from device
- manipulate during real time capture and playback

![ios stack](/assets/img/postimg/AVstack.png)


Playback process
----------------
AVFoundation을 통한 playback과정은 다음과 같다.
1. asset 생성
2. asset의 track load 요청
3. load시, assets을 위한 player item생성 
4. item을 player에 부착
5. player를 player layer에 부착
6. item이 play 준비 될때까지 대기 후 play

![playback process](/assets/img/postimg/playbackpro.png)

AVAsset : Timed audiovisual media(videos,songs)<br />
AVAsset을 play하기 위해서는 AVPlayer가 필요한데 이들간 직접 접근이 되지 않으므로 AVPlayerItem을 통해 state전달한다.<br />

그리고 UIView에 비디오화면을 그려줄때 AVPlayerLayer나 AVPlayerViewController를 사용한다.<br />

[참고한 영상](https://www.youtube.com/watch?v=mCiZW2xW4Ks)


AVPlayer
--------
Media재생이 목적으로 Nonsvisual object표시(= video 표시 못함)<br />
	=> video 재생을 위해서는 AVKit 또는 AVPlayerLayer사용
- 재생, 일시정지, 재생속도 변경, 시점탐색
- 로컬 및 원격파일 기반 미디어 재생가능
- 라이브 스트리밍 미디어 재생가능

[참고](https://developer.apple.com/documentation/avfoundation/avplayer)


AVPlayerLayer & AVPlayerViewController
--------------------------------------
둘다 AVPlayer에 비디오 내용 표시

|AVPlayerLayer | AVPlayerViewController|
|:----------:|:-------------:|
| AVPlayerViewController보다 Customize된 사용이 가능|   동영상을 표현하는 가장 간단한 방법|
|  |   = AVKit Player ViewController |
| [API](https://developer.apple.com/documentation/avfoundation/avplayerlayer) | [API](https://developer.apple.com/documentation/avkit/avplayerviewcontroller#//apple_ref/doc/uid/TP40014273) |
 


