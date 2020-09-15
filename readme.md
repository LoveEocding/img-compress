# 图片压缩插件 img-compress-file
## 使用
```
npm i img-compress-file
```

```
import compressImg from 'img-compress-file'

/**
 * 
 * @param {*} file 
 * @param {*} qualit 压缩质量 0-1
 * @param {*} isAutoCompress  是否自动压缩 开启自动压缩后 quality无效
 * @param {*} callback  回调函数 返回压缩后的file
 */
compressImg(file,1,true,function (comPressFile) {
    //得到压缩文件后的操作
    console.log(comPressFile);
});

```

## [github](https://github.com/LoveEocding/img-compress.git)
  
