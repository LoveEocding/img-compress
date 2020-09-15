/**
 * 
 * @param {*} file 
 * @param {*} qualit 压缩质量 0-1
 * @param {*} isAutoCompress  是否自动压缩
 * @param {*} callback  回调函数 返回压缩后的file
 */
const compressImg = (file, qualit = 1, isAutoCompress = true, callback) => {
    console.info('初始大小:', file.size);
    if (isAutoCompress)
    qualit = chooseQualityBySize(file.size);
    console.info('压缩比例:', qualit);
    if(qualit===1){
        callback(file);
        return;
    }
    let url = window.URL || window.webkitURL;
    let img = new Image(); //手动创建一个Image对象
    img.src = url.createObjectURL(file); //创建Image的对象的url
    img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        //通过canvas drawImage方法绘制图片
        ctx.drawImage(img, 0, 0, this.width, this.height); //后四个为位置参数，左上角x,y坐标，右下角x,y坐标
        //通过canvas toDataURl方法获取图像base64编码，quality为压缩质量参数，值越小图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', qualit);
        var result=dataURLtoBlob(base64);
        console.info('压缩成功大小:',result.size);
        callback(result);
    }
}


/**
 * 
 * @param {*} dataurl 
 * 根据文件的大小选择文件压缩比例
 */
const chooseQualityBySize = (size) => {
    const multiple = 1000;
    switch (true) {
        case size > 500 * multiple && size < 1000 * multiple:
            return 0.9;
        case size > 1000 * multiple && size < 2000 * multiple:
            return 0.5;
        case size > 2000 * multiple && size < 5000 * multiple:
            return 0.3;
        case size > 10000 * multiple:
            return 0.1;
        default:
            return 1;
    }

}


/**
 * 
 * @param {*} dataurl 
 * base64 转为文件流
 */
const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}


export default compressImg;