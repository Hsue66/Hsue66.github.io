---
layout: post
title: Vim cpp11사용시 syntax error 안뜨도록 변경
tags: [Vim]
author: hsue66 
---


> 참고한 [stackoverflow](https://stackoverflow.com/questions/18158772/how-to-add-c11-support-to-syntastic-vim-plugin?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

/.vimrc 입력후 저장
```
let g:syntastic_cpp_compiler = 'clang++'
let g:syntastic_cpp_compiler_options = ' -std=c++11 -stdlib=libc++'
```

