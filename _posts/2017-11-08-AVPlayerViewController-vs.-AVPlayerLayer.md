---
layout: post
title: AVPlayerViewController vs. AVPlayerLayer
tags: [IOS]
author: hsue66 
---


AVPlayerViewController와 AVPlayerLayer를 이용한 동영상 플레이어 구현 
------------
> 동영상 플레이어를 만들 때 사용하는 두 클래스의 코드와 차이를 확인하기 위해 정리한다. 전체 코드는 [Github](https://github.com/Hsue66/IOS_Samples/tree/master/ComparePlayer). AVPlayerViewController와 AVPlayerLayer가 무엇인지는 [이전글 AVFoundation](https://hsue66.github.io/2017/11/05/AVFoundation/)를 참고.

### Storyboard
![Storyboard](/assets/img/postimg/storyboard.png)
스토리보드와 같이 `by AVPlayerViewController`버튼을 누르면 AVPlayerViewController를 사용하고 `by AVPlayerLayer`버튼을 누르면 AVPlayerLayer를 이용하여 동영상을 재생한다.

>참고로 샘플동영상은 [Sample Videos](http://www.sample-videos.com)에서 다운로드 했다.

### AVPlayerViewController 이용

ViewController.swift
```swift
import AVFoundation		// for AVPlayer
import AVKit			// for AVPlayerViewController
```
```swift
class ViewController: UIViewController {
	
	var video1: String?
    var player:AVPlayer?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        video1 = Bundle.main.path(forResource: "SampleVideo", ofType: ".mp4")   	// SampleVideo.mp4에 해당하는 동영상주소를 video1에 저장 
	}

    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "seguePlayerController"{			// AVPlayerViewController로 이동하는 segue
            let videoURL = NSURL(fileURLWithPath: video1!)
            player = AVPlayer(url: videoURL as URL)
            
            let destination = segue.destination as! AVPlayerViewController	// segue의 destination을 AVPlayerViewController로 지정 
            destination.player = player			// 지정한 AVPlayerViewController의 player에 현재 player값 전달
        }
	}
}

```
Storyboard에 있는 AVKit Player ViewController는 `Show the Object library`에서추가한 것이다. 추가하지 않고 코드로 구현하면 다음과 같다.

```swift    
var player: AVPlayer?
var playerController = AVPlayerViewController()
    
override func viewDidLoad() {
	super.viewDidLoad()

	let video1: String? = Bundle.main.path(forResource: "SampleVideo", ofType: ".mp4") 
	let videoURL = NSURL(fileURLWithPath: video1!)
	
	player = AVPlayer(url: videoURL as URL)
	playerController.player = player
}
@IBAction func byAVPlayerController(_ sender: Any) {
	self.present(self.playerController, animated: true, completion: {
		self.playerController.player?.play()		// player를 playerController에 붙여서 재생
	})
}
```

`by AVPlayerViewController`누를 때 결과
<center><img src="/assets/img/postimg/avplayercontroller.png" alt="result" height="600"></center>

위와 같이 재생, 진행바, 음량버튼 등이 구현되어있는 화면으로 실행된다.
(features of the native system players)


### AVPlayerLayer 이용

ViewController.swift
```swift
class ViewController: UIViewController {
	
	var video2: String?

    override func viewDidLoad() {
        super.viewDidLoad()
        
        video2 = Bundle.main.path(forResource: "SampleVideo2", ofType: ".mp4")   	// SampleVideo2.mp4에 해당하는 동영상주소를 video2에 저장 
	}

    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "seguePlayerLayer"{		// VideoViewController로 이동하는 segue
            let destination = segue.destination as! VideoViewController
            destination.video = video2		// video2값을 VideoViewController의 video값으로 전달
        }
	}
}
```

VideoViewController.swift
```swift
import AVFoundation		// for AVPlayer
```
```
class VideoViewController: UIViewController {

    var video: String?
    @IBOutlet weak var vView: UIView!
    
    var player: AVPlayer!
    var playerLayer: AVPlayerLayer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let videoURL = NSURL(fileURLWithPath: video!)
        player = AVPlayer(url: videoURL as URL)
        playerLayer = AVPlayerLayer(player: player)		// player를 붙인 AVPlayerLayer 생성
        playerLayer.videoGravity = .resize
        
        vView.layer.addSublayer(playerLayer)			// vView에 playerLayer를 추가하여 동영상을 표시함
    }

    override func viewDidLayoutSubviews() {				// subView인 playerLayer의 영역 설정
        super.viewDidLayoutSubviews()
        playerLayer.frame = vView.bounds
    }

    override func viewDidAppear(_ animated: Bool) {		// view가 나타날때 player 재생
        super.viewDidAppear(animated)
        player.play()
    }
    
}

```

`by AVPlayerLayer`누를 때 결과
<center><img src="/assets/img/postimg/avplayerlayer.png" alt="result" height="600"></center>
AVPlayerViewController와 다르게 직접 추가한 vView외에는 아무것도 표시되지 않는다. <br />
→ AVPlayerLayer를 사용하면 Custom player를 생성할 수 있다.


