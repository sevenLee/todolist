import React, {Component} from 'react'


let event_state = {}
// let dragFlag = false

class CropCanvas extends Component {
    constructor(props){
        super(props)
        this.state = {
            containerTop: 0,
            containerLeft: 0,
            imageWidth: 'auto',
            imageHeight: 'auto',
            dragFlag: false
        }

        this.handleMouseDownOfImage = this.handleMouseDownOfImage.bind(this)
        this.handleMouseMoveOfImage = this.handleMouseMoveOfImage.bind(this)
        this.handleMouseUpOfImage = this.handleMouseUpOfImage.bind(this)
    }

    handleMouseDownOfImage(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.props.fileSrc) {
            // dragFlag = true
            this.setState({dragFlag: true})

            event_state.container_left = this.state.containerLeft;
            event_state.container_top = this.state.containerTop;
            event_state.mouse_x = (e.clientX || e.pageX ) + document.body.scrollLeft
            event_state.mouse_y = (e.clientY || e.pageY ) + document.body.scrollTop
        }
    }

    handleMouseMoveOfImage(e) {
        e.preventDefault();
        e.stopPropagation();

        if(this.props.fileSrc && this.state.dragFlag) {
            let mouse = {}

            mouse.x = (e.clientX || e.pageX ) + document.body.scrollLeft;
            mouse.y = (e.clientY || e.pageY ) + document.body.scrollTop;
            this.setState({
                containerLeft: mouse.x - ( event_state.mouse_x - event_state.container_left ),
                containerTop: mouse.y - ( event_state.mouse_y - event_state.container_top )
            })
        }
    }

    handleMouseUpOfImage(e) {
        e.preventDefault()
        // dragFlag = false
        this.setState({dragFlag: false})
    }

    render() {
        const {fileSrc, cropFileSrc, isCrop, onClickToCrop, onFileChange, onUploadFile} = this.props
        const {cropViewWidth, cropViewHeight, cropViewTop, cropViewLeft} = this.props

        return (
            <div>
                <div className="crop-wrapper">
                    <div className="wall top"/>
                    <div className="wall bottom"/>
                    <div className="wall left"/>
                    <div className="wall right"/>

                    <div
                        className="crop-view"
                        style={{
                            borderColor: (this.state.dragFlag)?'#1565C0':'#ffffff'
                        }}
                    >
                        <div className="crop-view-inner" >
                            <img
                                alt="pic"
                                src={cropFileSrc}
                                style={{
                                    display: (isCrop)? 'block':'none',
                                    width: this.state.imageWidth,
                                    height: this.state.imageHeight
                                }}
                                ref={(node) => { this.cropImageNode = node}}
                                onLoad={() => {
                                    // if(isCrop){
                                    //     this.setState({
                                    //         imageWidth: cropViewWidth,
                                    //         imageHeight: cropViewHeight,
                                    //         containerTop: cropViewTop + 2,
                                    //         containerLeft: cropViewLeft + 2
                                    //     })
                                    // }
                                }}
                            />
                        </div>
                    </div>

                    <div
                        className="resize-container"
                        ref={(node) => this.resizeContainerNode = node}
                        style={{
                            top: this.state.containerTop,
                            left: this.state.containerLeft
                        }}
                    >
                        <div
                            className="pic-control"
                            onMouseDown={this.handleMouseDownOfImage}
                            onMouseMove={this.handleMouseMoveOfImage}
                            onMouseUp={this.handleMouseUpOfImage}
                        />
                        <img
                            alt="pic"
                            src={fileSrc}
                            style={{
                                display: (isCrop)?'none':'block',
                                width: this.state.imageWidth,
                                height: this.state.imageHeight
                            }}
                            ref={(node) => { this.imageNode = node}}
                            onLoad={() => {
                                if(isCrop){
                                    this.setState({
                                        imageWidth: cropViewWidth,
                                        imageHeight: cropViewHeight,
                                        containerTop: cropViewTop + 2,
                                        containerLeft: cropViewLeft + 2
                                    })
                                }
                            }}
                        />

                    </div>
                </div>
                <div className="upload-setting">
                    <label
                        htmlFor="pic-size"
                        style={{display: (fileSrc)? 'inline-block' : 'none'}}
                    >Result Size</label>
                    <select
                        id="pic-size"
                        defaultValue="200"
                        style={{display: (fileSrc)? 'inline-block' : 'none'}}
                        ref={(node) => this.settingSizeNode = node}
                    >
                        <option value="100">100px x 100px</option>
                        <option value="200">200px x 200px</option>
                        <option value="300">300px x 300px</option>
                        <option value="400">400px x 400px</option>
                        <option value="500">500px x 500px</option>
                    </select>
                </div>
                <div className="upload-controls">
                    <label className="tab" id="upload" htmlFor="avatarFile">Upload file</label>
                    <input
                        type="file"
                        id="avatarFile"
                        className="hidden"
                        name="avatarFile"
                        onChange={(e) => {
                            e.preventDefault();
                            onFileChange(e)
                        }}/>
                    <button
                        className="tab preview"
                        style={{display: (fileSrc)? 'inline-block' : 'none'}}
                        onClick={(e) => {
                            e.preventDefault()
                            if(fileSrc){
                                onClickToCrop(this.imageNode, this.state.containerLeft, this.state.containerTop)
                            }
                        }}
                    >{
                        (!isCrop)?
                            'Crop to Preview'
                            :
                            'Back to Modify image'
                    }</button>

                    <input
                        type="submit"
                        className="tab submit"
                        style={{display: (fileSrc)? 'inline-block' : 'none'}}
                        value="Submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if(!this.imageNode){
                               return
                            }

                            const params = { size: this.settingSizeNode.value }

                            onUploadFile(this.imageNode, this.state.containerLeft, this.state.containerTop, params)
                        }}
                    />
                </div>

            </div>
        )
    }
}

export default CropCanvas