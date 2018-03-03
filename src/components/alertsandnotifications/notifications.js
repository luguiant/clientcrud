import { Button, notification } from 'antd';

const openNotificationWithIcon = (type,title,desc) => {
    notification[type]({
        message: title,
        description: desc,
    });
};

export default openNotificationWithIcon