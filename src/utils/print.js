export default class {
  constructor(option) {
    this.standards = {
      strict: 'strict',
      loose: 'loose',
      html5: 'html5'
    };
    this.counter = 0;
    this.settings = {
      standard: this.standards.html5,
      extraHead: '', // 附加在head标签上的额外元素,使用逗号分隔
      extraCss: '', // 额外的css逗号分隔
      popTitle: '', // 标题
      endCallback: null, // 成功打开后的回调函数
      el: '' // 局部打印的id
    };
    Object.assign(this.settings, option);
    this.init();
  };
  init() {
    this.counter++;
    this.settings.id = `printArea_${this.counter}`;
    let box = document.getElementById(this.settings.id);
    if (box) {
      box.parentNode.removeChild(box);
    }
    let PrintAreaWindow = this.getPrintWindow(); // 创建iframe
    this.write(PrintAreaWindow.doc); // 写入内容
    console.log("🚀 ~ init ~ PrintAreaWindow.doc:", PrintAreaWindow.doc)
    //this.print(PrintAreaWindow);
    this.settings.endCallback();
  };
  print(PAWindow) {
    let paWindow = PAWindow;
	console.log('---调用打印 focus-----');
	paWindow.focus();
	paWindow.print();
	console.log('---调用打印 print-----');
  };
  write(PADocument, $ele) {
    PADocument.open();
    PADocument.write(`${this.docType()}<html>${this.getHead()}${this.getBody()}</html>`);
    PADocument.close();
  };
  docType() {
    if (this.settings.standard === this.standards.html5) {
      return '<!DOCTYPE html>';
    }
    var transitional = this.settings.standard === this.standards.loose ? ' Transitional' : '';
    var dtd = this.settings.standard === this.standards.loose ? 'loose' : 'strict';

    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
  };
  getHead() {
    let extraHead = '';
    let links = '';
    let style = '';
    if (this.settings.extraHead) {
      this.settings.extraHead.replace(/([^,]+)/g, function(m) {
        extraHead += m;
      });
    }
	[].forEach.call(document.querySelectorAll('link'), function (item, i) {
        if (item.href.indexOf('.css') >= 0) {
          links += '<link type="text/css" rel="stylesheet" href="' + item.href + '" >';
        }
    });
   
    for (let i = 0 ; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].cssRules || document.styleSheets[i].rules) {
        let rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
        for (let b = 0 ; b < rules.length; b++) {
		  try {
              style += rules[b].cssText;
            } catch (err) {}
        }
      }
    }

    if (this.settings.extraCss) {
      this.settings.extraCss.replace(/([^,\s]+)/g, function(m) {
        links += `<link type="text/css" rel="stylesheet" href="${m}">`;
      });
    }
    style += `
    * {
      word-break: break-all;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body,
    #app {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }

    .page-container {
      height: calc(100vh - 60px);
      width: 100%;
      overflow: auto;
      padding: 15px;
      background-color: #f5f5f5;
    }
    ::-webkit-scrollbar {
      display:none;
    }  
    `
    console.log(style,"----------------------------->")
    return `<head><title>${this.settings.popTitle}</title>${extraHead}${links}<style type="text/css">${style}</style></head>`;
  };
  getBody() {
    let ele = this.getFormData(document.querySelector(this.settings.el));
    let htm = ele.outerHTML;
    console.log('htm', htm);
    return '<body>' + htm + '</body>';
  };
  // 处理form表单的默认状态
  getFormData(ele) {
    let that = this
    let copy = ele.cloneNode(true);

    //update-begin--Author:sunjianlei  Date:20190510 for：支持忽略打印的标签----------------------
    let allElements = copy.querySelectorAll('*');
	[].forEach.call(allElements, function (item) {
		let attr = item.getAttribute('ignore-print');
        attr = (attr == null ? item.getAttribute('ignoreprint') : attr);
        if (attr != null && attr.toString() === 'true') {
            item.outerHTML = ''
        }
	});
    //update-end--Author:sunjianlei  Date:20190510 for：支持忽略打印的标签----------------------

    let copiedInputs = copy.querySelectorAll('input,select,textarea');
	[].forEach.call(copiedInputs, function (item, i) {
	  let typeInput = item.getAttribute('type');
      let copiedInput = copiedInputs[i];
      // update-begin--Author:sunjianlei  Date:20191101 for：优化赋值逻辑方式 ----------------------
      if (typeInput == null) {
        typeInput = item.tagName === 'SELECT' ? 'select' : item.tagName === 'TEXTAREA' ? 'textarea' : '';
      }
      if (typeInput === 'radio' || typeInput === 'checkbox') {

        item.checked && copiedInput.setAttribute('checked', item.checked);

      } else if (typeInput === 'select') {
		[].forEach.call(copiedInput.querySelectorAll('option'), function (op, b) {
			if (op.selected) {
            op.setAttribute('selected', true);
          }
		});
      } else if (typeInput === 'textarea') {
        // update-begin--Author:sunjianlei  Date:20220302 for：修复textarea换行会出现<br>的问题 ----------------------
        copiedInput.innerHTML = item.value
        // update-end----Author:sunjianlei  Date:20220302 for：修复textarea换行会出现<br>的问题 ----------------------
      } else {
        copiedInput.value = item.value;
        copiedInput.setAttribute('value', item.value);
      }
      //update-end--Author:sunjianlei  Date:20191101 for：优化赋值逻辑方式 ----------------------
	});

    //update-begin--Author:jianlei  Date:20190507 for：支持Canvas打印--------------------
    var sourceCanvas = ele.querySelectorAll('canvas');
    var copyCanvas = copy.querySelectorAll('canvas');

	[].forEach.call(copyCanvas, function (item, i) {
    // update-begin--author:sunjianlei date:20220407 for：echarts canvas宽度自适应 ---------
    if (that.isECharts(item)) {
      if (item.parentElement.style.width) {
        item.parentElement.style.width = '100%'
        item.parentElement.style.height = 'auto'
      }
      if (item.parentElement.parentElement.style.width) {
        item.parentElement.parentElement.style.width = '100%'
        item.parentElement.parentElement.style.height = 'auto'
      }
    }
    // update-end--author:sunjianlei date:20220407 for：echarts canvas宽度自适应 ---------

      var url = sourceCanvas[i].toDataURL()
        //update-begin--Author:sunjianlei  Date:20190510 for：canvas宽度自适应----------------------
        item.outerHTML = '<img src="' + url + '" style="width:100%;"/>'
        //update-end--Author:sunjianlei  Date:20190510 for：canvas宽度自适应----------------------
    });
      //update-end--Author:jianlei  Date:20190507 for：支持Canvas打印----------------------

    return copy;
  };

  /**
   * 判断是否是 ECharts 的 Canvas
   *
   * @param item canvas
   * @time 2022-4-7
   * @author sunjianlei
   */
  isECharts(item) {
    let attrName = '_echarts_instance_'
    let parent = item.parentElement
    if (parent.getAttribute(attrName) != null) {
      return true
    }
    if (parent.parentElement) {
      return parent.parentElement.getAttribute(attrName) != null
    }
    return false
  };

  getPrintWindow() {
    var f = this.Iframe();
    return {
      win: f.contentWindow || f,
      doc: f.doc
    };
  };
  Iframe() {
    let frameId = this.settings.id;
    let iframe;
	var that = this;
    try {
      iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.style.border = '0px';
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.right = '0px';
      iframe.style.top = '0px';
      iframe.setAttribute('id', frameId);
      iframe.setAttribute('src', new Date().getTime());
      iframe.doc = null;
	  iframe.onload = function () {
		var win = iframe.contentWindow || iframe;
		that.print(win);
	  }
      iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
    } catch (e) {
      throw new Error(e + '. iframes may not be supported in this browser.');
    }

    if (iframe.doc == null) {
      throw new Error('Cannot find document.');
    }

    return iframe;
  };
};