---
layout: post
title: Vim setting
tags: [vim]
---

Vim setting
-------

> 테마는 PluginInstall을 이용하면 쉽게 사용가능하다.
> PluginInstall을 사용하려면 Vundle 사용해야하는데 그건 [Nolboo's Blog](https://nolboo.kim/blog/2016/09/20/vim-plugin-manager-vundle/) 에서 참고했다.

<pre><code>
set nocompatible
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'gmarik/Vundle.vim'
Plugin 'tpope/vim-fugitive'
Plugin 'L9'
Plugin 'git://git.wincent.com/command-t.git'
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
Plugin 'The-NERD-tree'
Plugin 'AutoComplPop'
Plugin 'dracula/vim'
Plugin 'scrooloose/syntastic'
Plugin 'nathanaelkane/vim-indent-guides'
call vundle#end()            " required
filetype plugin indent on    " required

set nu
set smartindent
set hlsearch
set ignorecase
set tabstop=4
set shiftwidth=4
set cindent
syntax on
color dracula

</code></pre>

Vim Theme은 [Awesome Vim Color Scheme](https://github.com/rafi/awesome-vim-colorschemes)가면 여러 종류 나열되있으니 보고 고르면 된다. 테마 클릭하면 readme.md에 설치 방법이 나와있다.
만약 readme에 Plugin으로 설치하는방법이 없다면[Vim Awesome](https://vimawesome.com)에서 검색해보기!

(colorschemes으로 적용하는건 mac에서는 [루트사용자활성화](https://support.apple.com/ko-kr/HT204012)한 후 `/usr/share/vim/vim74/colors/`에 원하는colorschemes 넣어주는 방법으로 하면 됨)

나는 `Dracula`로 했는데 [Dracula](https://draculatheme.com)사이트 가면 다양한 에디터, 터미널 제공해서 통일하는거 좋아하는사람이 쓰기 좋은듯 (나는 vim말고 iterm2에도 적용했음)

__Plugin 적용방법__
1. 위 코드처럼~/.vimrc파일에서 call사이에 Plugin추가
```
Plugin 'dracula/vim'
```
2. :so%
3. :PluginInstall
아래와 같은 화면이 나오면서 설치
![plugin install](/assets/img/postimg/PluginInstall.png)
4. :q로 설치화면 나오기
5. ~/.vimrc 아래에 다음 코드 추가 
```
syntax on
color dracula
```

vim 다시 실행하면 바뀐 테마로 표시된다.


__Plugin 삭제방법__
1. ~/.vimrc파일에서 삭제하려는 Plugin 지우기
2. :so%
3. :PluginClean
지우는 화면에서 Y입력해서 삭제진행

삭제완료 
