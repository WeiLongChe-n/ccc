<!--
 * @Author: 陈威隆 18700880154@163.com
 * @Date: 2024-07-30 17:46:55
 * @LastEditors: 陈威隆 18700880154@163.com
 * @LastEditTime: 2024-07-31 16:00:55
 * @FilePath: \ccc\src\view\Home\index.vue
 * @Description: 
-->
<template>
  <div class="page-container" id="print-page">
    <h1 @click="handleClick">打印pdf测试</h1>
    <p>testtesttesttesttesttesttesttesttesttesttestppppppppppppppppppppppppppppppppp</p>
    <p>tetesttesttesttesttesttesttesttesttesttesttestst</p>
    <p>testesttesttesttesttesttesttesttestt</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>2</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <p>33333333</p>
    <div class="btn-box" ignoreprint="true">
      <button @click.stop="downloadPdf2(configuration1)">打印configuration1</button>
      <button @click.stop="downloadPdf2({})">打印</button>
    </div>
  </div>
</template>
<script setup>
import {ref,reactive} from 'vue';
import {useRouter} from "vue-router"
import html2pdf from 'html2pdf.js'
import $printJS, { Configuration } from 'print-js';
import printJS from 'print-js';
import Print from '@/utils/print';
const router = useRouter();
const handleClick = () => {
  console.log('home');
  router.push({
    path:"/about"
  })
}
const configuration1 = reactive({
  type: 'html',
  printable: '#print-page',
})
const downloadPdf2 = (configuration) => {
  if (configuration?.type === 'html') {
    if(configuration?.printable){
      new Print({
        el: configuration?.printable,
        endCallback() {},
      });
    }else {
      window.print()
    }
  } else {
    printJS({
      printable: 'print-page', // pdf or image url, html element id or json data object
      type: 'html', // pdf, html, image, json and raw-html.
    });
  }
}

const downloadPdf1 = () => {
  let opt = {
      margin: 10,  // pdf外边距
      filename:  'test11'+'.pdf', // 导出的pdf名称
      image: { // 图片的类型和质量，详情： https://github.com/eKoopmans/html2pdf.js#image-type-and-quality
        type: 'jpeg',
        quality: 0.98  // 取0-1，默认0.95，仅适用  jpeg/webp
      },
      html2canvas: {
        scale: 1,
        dpi: 92,
      },
      jsPDF: { // 详情：http://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jsPDF.html
        unit: 'pt', // pt、mm、cm、in
        format: 'a4', 
        orientation: 'portrait' // 纵向portrait，横向landscape
      }
    };
  html2pdf().set(opt).from(document.getElementById('print-page')).save();
}
</script>
<style scoped>

p{
  font-size:50px;
}
.btn-box{
  top: 50px;
  left: 50px;
}
@media print{
  button {
    display: none;
  }
}
</style>