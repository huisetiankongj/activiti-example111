(function($,window,undefined) {
	if(!Array.indexOf){
		Array.prototype.indexOf = function(el){
			for (var i=0,n=this.length; i<n; i++){
				if (this[i] === el){
					return i;
				}
			}
			return -1;
		}
	}
	var pluginName = "fileUploader",fileListPrex = "thelist", containterName= "uploaderContainPrex",
	imgRegExp = /^(gif|jpg|jpeg|bmp|png)$/i, officeRegExp = /^(doc|docx|xls|xlsx|ppt|pptx)$/i,docExp = /^\.(doc|docx)$/i, xlsRegExp = /^\.(xls|xlsx)$/i, pptRegExp = /^\.(ppt|pptx)$/i, 
	defaults = {
		acceptExt :'gif,jpg,jpeg,bmp,png,GIF,JPG,JPEG,BMP,PNG',
		btns : ["picker","ctlBtn"],
		btnsClass : ["", "btn btn-default"],
		btnsName : ["选择文件","开始上传"],
		isMul:true,//是否多附件,
		auto:true,
		isForce:true    //是否直接新增记录或者删除数据的附件表记录
	};
	
	/**
	*注意： 1、settings.btns为空的时候为详情，只显示单纯的图片
	*		
	*
	*/
	
	var uploaderFileSvc = {
		url : {
			delAttachment : rootAdminPath +  "/sys/attachment/delete?t=" + new Date().getTime(),
			findAttachment : rootAdminPath + "/sys/attachment/list?t=" + new Date().getTime(),
			saveAttachment : rootAdminPath + "/sys/attachment/save?t=" + new Date().getTime(),
			getPic : rootAdminPath + "/sys/attachment/getPic?t=" + new Date().getTime(),
		},
		fnDelFile: function(atta) {
            Svc.AjaxJson.post(uploaderFileSvc.url.delAttachment, atta);
        }
	}
	
	/*添加文件
	*uploader  文件上传
	*$list 文件容器
	*file  文件
	*isMul 是否为多附件
	*src   图片src  (如果src有只，直接设置)
	*/
	function addFile(fileUploader,$list,file,isMul,src){
		var $li= $(
	            '<div id="' + file.id + '" class="file-item thumbnail filelist">' +
	                '<img style="width:100px;height:100px" title="'+file.name+'" >' +
	            '</div>'
	            ),
	    	 $img = $li.find('img'),
	    	 $btns;
	    	 
	    	 //讲文件保存在div里面
	    	 $li.data("file",file);
	    	 
		     if(fileUploader.settings.btns.length>0){
		     	  $btns = $('<div class="file-panel">' +
		                '<span class="cancel">删除</span>' +
		                '</div>').appendTo( $li );     
				  
				    //如果是单文件-》清空文件容器以及后台删除文件
				    if(!isMul){
				    	removeFile(fileUploader,$list.find("div.file-item").data("file"));
				    	$list.html("");
				    }
				    
				    file.rotation = 0;
				    
				    
				    $li.on( 'mouseenter', function() {
			            $btns.stop().animate({height: 30});
			        });
			
			        $li.on( 'mouseleave', function() {
			            $btns.stop().animate({height: 0});
			        });
			        
				    $btns.on( 'click', 'span', function() {
			            var index = $(this).index(),
			                deg;
			            switch ( index ) {
			                case 0:
			                    removeFile(fileUploader,file);
			                    return;
			            }
					});
		     }   
		     if(src){
				$img.attr( 'src', src );
			 }else{
				// 创建缩略图
			    // thumbnailWidth x thumbnailHeight 为 100 x 100
			    var thumbnailWidth=100,thumbnailHeight=100;
			    fileUploader.uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>不能预览</span>');
			            return;
			        }
			
			        $img.attr( 'src', src );
			    }, thumbnailWidth, thumbnailHeight );
			}    
	     	// $list为容器jQuery实例
			$list.append( $li );
	}
	
	/*移除文件
	*uploader  文件上传
	*file  文件
	*如果未上传就是没有新文件名称，直接删除
	*如果已经上传会有文件名称，当没有fromId的时候就只删除文件，如果有fromId同时删除文件和记录
	*/
	function removeFile(fileUploader,file){
		if(file){
			var $li = $('#'+file.id);
			if(fileUploader.settings.isForce&&($li.attr("data-attid")||$li.attr("data-newFile"))){
				uploaderFileSvc.fnDelFile({id:$li.attr("data-attId"),newFileName:$li.attr("data-newFile"),type:fileUploader.settings.attachment.type})
			}
		    //不是自己生产的file
		    if(!file.self){
		    	fileUploader.uploader.removeFile( file );
		    }
		    
		    $li.off().find('.file-panel').off().end().remove();
		}
		
	}
	window.FileUploader = window.FileUploader||{};
	FileUploader = function(element, options) {
        this.isCanVisible = false;
        this.fileSize = 0;
        this.$element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
         //如果是自动上传，则去掉开始上传按钮
        if(this.settings.auto){
        	this.settings = $.extend(this.settings,{"btns" : ["picker"]});
        	this._defaults = $.extend(this._defaults,{"btns" : ["picker"]});
        }
        if(options.btns&&options.btns.length==0){
        	this.settings = $.extend(this.settings,{"btns" : []});
        	this._defaults = $.extend(this._defaults,{"btns" : []});;
        }
        this._name = pluginName;
        this.init();
        this.initWebUploader();
        this.registerEvents();
    };
	FileUploader.prototype = {
		init : function(){	
			var _this = this, r;
			var _defaults = this._defaults,btns = this._defaults.btns;
			_this.r = r = parseInt(1000 * Math.random());
			_this.$fileListContainter = $('<div id="' + fileListPrex + _this.r + '" class="uploader-list"></div>').appendTo(_this.$element);
			_this.$operBtnsContanter = $('<div class="btns"></div>').appendTo(_this.$element);
			var btnDivContain="",k;
			$.each(_this.settings.btns,function(i,v){
				if((k = _defaults.btns.indexOf(v))>=0){
					btnDivContain +=['<div id=',v+r,' class="',_defaults.btnsClass[k],'"  style="margin-right:10px;vertical-align: top;">',_defaults.btnsName[k],'</div>'].join("");
				}
			});
			$(btnDivContain).appendTo(_this.$operBtnsContanter);
			//获取上传按钮
			_this.$uploadBtn = $("#" + btns[1]?btns[1]:btns[0] + this.r);
		},
		initWebUploader : function(){
			var _this = this,
				$list = _this.$fileListContainter,
				$uploadBtn = _this.$uploadBtn,
				state = 'pending',
				option ={
					auto:true,
					headers :{
	        			accept:"*/*"
	        		},
	        		accept :{
	        			extensions: _this.settings.acceptExt,
	        			mimeTypes: 'image/*'
	        		},
			        // swf文件路径
				    swf:'Uploader.swf',
				    // 文件接收服务端。
				    server:uploaderFileSvc.url.saveAttachment,
				    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				    resize: false,
			        fileVal: 'ajaxFile',
			        pick: '#picker'+this.r,
			        fileSingleSizeLimit: 2* 1024 * 1024,    // 20 M
			        fileSizeLimit: 200 * 1024 * 1024    // 200 M
			    };
			//自动上传文件
			_this.settings.auto&&$.extend(option,{"auto":_this.settings.auto});
			//是否多附件
			!_this.settings.isMul&&$.extend(option,{"fileNumLimit":1});
			 
			//创建webuploader
			if(!_this.settings.attachment.fromId)
				_this.settings.attachment.fromId = undefined;
			var uploader = WebUploader.create($.extend({}, option, {
                formData:_this.settings.attachment
            }));
            
            _this.uploader = uploader;
            
            	
            uploader.on( 'beforeFileQueued', function( file ) {
            	//如果不是强制想后台加入附件记录，设值为空
            	if(!_this.settings.isForce)
            		this.options.formData.fromId="";
		    });
            // 当有文件添加进来的时候
		    uploader.on( 'fileQueued', function( file ) {
		    	addFile(_this,$list,file,_this.settings.isMul);
		    });
		    // 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
			    var $li = $( '#'+file.id ),
			        $percent = $li.find('.progress span');
			
			    // 避免重复创建
			    if ( !$percent.length ) {
			        $percent = $('<p class="progress"><span></span></p>')
			                .appendTo( $li )
			                .find('span');
			    }
			
			    $percent.css( 'width', percentage * 100 + '%' );
			});
			
			
					    
		    uploader.on( 'uploadSuccess', function( file,response ) {
		    	var data = response.data;
		    	if(data==false){
		    		return false;
				}
			    
		    	var $file = $( '#'+file.id );
		    	$file.attr("data-flag","1");
		    	$file.attr("data-newFile",data.newFileName);
		    	$file.attr("data-oldFile",data.oldFileName);
		    	$file.attr("data-attId",data.id?data.id:"");
		    	$file.addClass('upload-state-done');
		    	var _width = 500,_height=500;
				if(file._info){
					_width = file._info.width;
					_height = file._info.height;
				}
				// 如果为非图片文件，可以不用调用此方法。
			    uploader.makeThumb( file, function( error, src ) {
			        $file.find("img").attr( 'data-src', src );
			    },_width,_height);
		    });
		    uploader.on( 'uploadError', function( file ) {
		    	 var $li = $( '#'+file.id ),
			        $error = $li.find('div.error');
			
			    // 避免重复创建
			    if ( !$error.length ) {
			        $error = $('<div class="error"></div>').appendTo( $li );
			    }
			
			    $error.text('上传失败');
		    });
		    uploader.on( 'all', function( type ) {
				if (type === "startUpload") {
                    state = "uploading";
                } else {
                    if (type === "stopUpload") {
                        state = "paused";
                    } else {
                        if (type === "uploadFinished") {
                            state = "done";
                            $(".form-actions input[type='button']").removeAttr("disabled");
                        }
                    }
                }
                if (state === "uploading") {
                    $uploadBtn.text('暂停上传');
                    $(".form-actions input[type='button']").attr("disabled", "disabled");
                } else {
                    $uploadBtn.text('开始上传');
                }
		    });
		    
			uploader.on( 'uploadComplete', function( file ) {
			    $( '#'+file.id ).find('.progress').remove();
			});
			uploader.onError = function(code) {
                switch (code) {
                  case "F_DUPLICATE":
                  	layer.msg("不能同时上传文件相同文件");
					break;
                  case "Q_EXCEED_NUM_LIMIT":
                  	layer.msg("已达允许上传文件数量");
					break;
                  case "F_EXCEED_SIZE":
                  	layer.msg("单个文件超出2M");
					break;
                  case "Q_EXCEED_SIZE_LIMIT":
                    layer.msg("上传文件超出200M");
					break;
                  case "Q_TYPE_DENIED":
                  	layer.msg("上传文件格式错误");
					break;

                  default:
                  	layer.msg("错误: " + code);
					break;
                }
            };
            $uploadBtn.click(function() {
            	if ( state === 'uploading' ) {
		            uploader.stop();
		        } else {
		            uploader.upload();
		        }
		    });
        	if(_this.settings.attachment.fromId){
        		_this.loaderData();
        	}
		    
            
		},
		loaderData: function(opt) {
			var _this = this;
            	_this.fileSize = 0,
            	_settings =  _this.settings;//文件容器
            	
            Svc.AjaxJson.post(uploaderFileSvc.url.findAttachment, _settings.attachment, function(data) {
            	if(data.length>0){
            		$.each(data,function(i,info){
            			var file ={},src=uploaderFileSvc.url.getPic+"&id="+info.id;
	            		file.id ="SELF"+_this.r+"_WU_FILE_10000"+i;
	            		file.name = info.oldFileName;
	            		file.self =true;
	            		//添加文件
	            		addFile(_this,_this.$fileListContainter,file,_this.settings.isMul,src);
	            		var $file = $( '#'+file.id );
				    	$file.attr("data-flag","1");
				    	$file.attr("data-newFile",info.newFileName);
				    	$file.attr("data-oldFile",info.oldFileName);
				    	$file.attr("data-attId",info.id?info.id:"");
				    	$file.data("file",file);
				    	
				    	if(_this.settings.btns.length>0){
				    		$file.addClass('upload-state-done');
				    	}
				    	
				    	//如果是单文件上传的话
	            		if(!_this.settings.isMul){
	            			return false;
	            		}
            		})
            	}
            	
            });
		},
		registerEvents : function(){
			var _this = this, _fileListContainter = _this.$fileListContainter;
			_fileListContainter.delegate("div[data-flag='1'] img","click", function() {
                var $obj = _fileListContainter.find("div[data-flag='1'] img");
               	var config = {};
                config.activeImage = $(this).attr("data-src")?$(this).attr("data-src"):$(this).attr("src");
                config.aData = $obj;
                //LightBox&&LightBox.showImg(config);
                ImgViewer&&ImgViewer.showImg(config);
            })
		},
		getUploadFiles : function(){
			var _this = this;
			var flagFiles =_this.$fileListContainter.find("div[data-flag='1']");
			var oldFileNames = [],newFileNames=[];
			$.each(flagFiles,function(){
				var that = $(this);
				if(!that.attr("data-attId")||(!_this.settings.isForce)){
					oldFileNames.push(that.attr("data-oldFile"));
					newFileNames.push(that.attr("data-newFile"));
				}
			});
			return {
				oldFileNames: oldFileNames,
				newFileNames: newFileNames,
				fileType:_this.settings.attachment.type
			}
		}
	};
	
})(jQuery,window);