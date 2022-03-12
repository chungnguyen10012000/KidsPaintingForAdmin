import { useQuill } from 'react-quilljs';
import BlotFormatter, { DefaultAligner } from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

import React, {  useState } from 'react';


const Editor = () => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  // const data: Delta = JSON.parse(`{"ops":[{"attributes":{"color":"#e60000"},"insert":"aaa"},{"insert":"\n"}]}`)
   //const x = Object.assign(new Delta, data)
   //console.log(data)

  let [textHtml, setTextHtml] = useState<string>('')

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }
  if (quill) { 
    quill.on('text-change', (delta) => {
      setTextHtml(quill.root.innerHTML)
    });
  }
  console.log(textHtml)

 
  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
