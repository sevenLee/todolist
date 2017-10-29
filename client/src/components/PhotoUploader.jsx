import React, {Component} from 'react'
import CropCanvas from './CropCanvas'

const cropWrapperWidth = 600
const cropWrapperHeight = 350
const cropViewWidth = 300
const cropViewHeight = 300
const cropViewLeft = cropWrapperWidth * 0.5 - cropViewWidth * 0.5
const cropViewTop = cropWrapperHeight * 0.5 - cropViewHeight * 0.5

function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], {type: mimeString});
    return blob;
}

class PhotoUploader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imagePreviewUrl: null,
            cropFileSrc: null,
            isCrop: false,
            serverImageUrl: '',
            resultSize: 300
        }

        this.handleCropping = this.handleCropping.bind(this)
        this.handleImagePreview = this.handleImagePreview.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this)
        this.makeResultImage = this.makeResultImage.bind(this)
    }

    makeCropImageDataURL(imageNode, containerLeft, containerTop) {
        const cropCanvas = document.createElement('canvas');

        cropCanvas.width = cropViewWidth
        cropCanvas.height = cropViewHeight

        const drawStartLeft = cropViewLeft - containerLeft
        const drawStartTop = cropViewTop - containerTop

        cropCanvas.getContext('2d').drawImage(imageNode, drawStartLeft, drawStartTop, cropViewWidth, cropViewHeight, 0, 0, cropViewWidth, cropViewHeight);
        return cropCanvas.toDataURL("image/png")
    }

    handleCropping(imageNode, containerLeft, containerTop) {
        const cropFileSrc = this.makeCropImageDataURL(imageNode, containerLeft, containerTop)

        this.setState({
            isCrop: !this.state.isCrop,
            cropFileSrc: cropFileSrc
        })
    }

    handleImagePreview(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        console.log('file:', file)

        if(!file){
            return
        }

        const re = /jpeg|jpg|png/
        const isImage = re.test(file.type)

        if(!isImage){
            alert('Invalid Format! Please upload image format, ex: .png or .jpg')
            return
        }

        reader.onloadend = () => {
            this.setState({
                isCrop: false,
                imagePreviewUrl: reader.result,
            });
        }

        reader.readAsDataURL(file)
    }

    handleUploadFile(imageNode, containerLeft, containerTop, params) {
        if (!this.state.imagePreviewUrl) {
            return;
        }

        const cropImageDataURL = this.makeCropImageDataURL(imageNode, containerLeft, containerTop)
        const imageBlob = dataURItoBlob(cropImageDataURL);
        let fdata = new FormData();
        fdata.append('avatarFile', imageBlob);

        fetch(`/api/contacts/a1/avatar/${params.size}`, {
            method: 'post',
            body: fdata,
        })
            .then((res) => {
                let resolveDataPromise = res.json()
                return resolveDataPromise
            })
            .then((res) => {
                if(res.error){
                    return Promise.reject(res)
                }
                console.log('Client Success:', res)
                this.setState({
                    serverImageUrl: res.url,
                    resultSize: params.size
                })
            })
            .catch((err) => {
                alert(err.error)
            })
    }

    makeResultImage() {
        if(this.state.serverImageUrl){
            const w = this.state.resultSize*1 + 4

            return (
                <div
                    className="res-container preview"
                    style={{
                        border: '2px solid #1565C0',
                        width: w,
                        height: w
                    }}
                >
                    <img
                        alt="server-pic"
                        src={this.state.serverImageUrl}/>
                </div>
            )
        }else{
            return (
                <div
                    className="res-container"
                    style={{
                        border: '2px dashed #1565C0',
                        width: 304,
                        height: 304
                    }}
                >
                    <div className="dsc no">No Upload Data</div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <CropCanvas
                    fileSrc={this.state.imagePreviewUrl}
                    cropFileSrc={this.state.cropFileSrc}
                    isCrop={this.state.isCrop}
                    cropViewWidth={cropViewWidth}
                    cropViewHeight={cropViewHeight}
                    cropViewLeft={cropViewLeft}
                    cropViewTop={cropViewTop}
                    onClickToCrop={this.handleCropping}
                    onFileChange={this.handleImagePreview}
                    onUploadFile={this.handleUploadFile}
                />
                <hr/>
                <div className="server-response">
                    <h3>Image from Server: {this.state.resultSize}x{this.state.resultSize}</h3>
                    {this.makeResultImage()}
                </div>
            </div>
        )
    }
}

export default PhotoUploader
