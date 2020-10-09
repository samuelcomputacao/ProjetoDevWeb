import { Space, Spin } from 'antd';
import React from 'react';

function ProgressBar() {
    return (
        <div className='contentEmpty grid'>
            <div className='center'>
                <Space size='larger'>
                    <Spin size='large' />
                </Space>
            </div>
        </div>
    );
}

export default ProgressBar;