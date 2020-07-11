import React from "react";
import {Button} from 'antd';
import './index.css'

function FooterButtons({label1, label2, callback1, callback2, visible1=true,visible2=true, htmlType1='button', htmlType2='button'}){
   return (
       <div>
            {visible1 && <Button className='Button' type='primary' onClick={callback1} htmlType={htmlType1}>{label1}</Button>}
            {visible2 && <Button className='Button' type='danger' onClick={callback2}htmlType={htmlType2}>{label2}</Button>}
       </div>
   );
}

export default FooterButtons;