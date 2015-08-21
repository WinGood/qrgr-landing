<?php
require_once './vendor/autoload.php';

if(!empty($_POST))
{
    echo selectAction();
}

function renderText($text, $ajax = false, $content_type = 'text/html')
{
    if ($_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest' && $ajax) {
        die('denied');
    }
    header('Content-Type: ' . $content_type . '; charset=utf-8', true);
    return $text;
    exit();
}

function selectAction()
{
    $config['email'] = 'nikon.alp@gmail.com';
    $config['pass']  = 'alpextreme';
    $subject = '';
    $body = '';

    $json_list = array();

    try {
        switch($_POST['action']){
            case 'callback':
                $subject = 'Заявка на обратный звонок trening.qrgr.ru';
                $body = '<p style="font-size: 14px;"><strong>Поступила новая заявка:</strong></p>' .
                        '<div style="padding:10px;background: #f6fbfd;border: 1px solid #d2e0ec; margin: 10px 0; line-height: 20px;">'.
                        'Имя: ' . strip_tags($_POST['name']) . '<br>' .
                        'Телефон: ' . strip_tags($_POST['phone']) .
                        '</div>';
                break;
            case 'order':
                $subject = 'Запись на тренинг trening.qrgr.ru';
                $body = '<p style="font-size: 14px;"><strong>Поступила новая заявка:</strong></p>' .
                    '<div style="padding:10px;background: #f6fbfd;border: 1px solid #d2e0ec; margin: 10px 0; line-height: 20px;">'.
                    'Имя: ' . strip_tags($_POST['name']) . '<br>' .
                    'Email: ' . strip_tags($_POST['email']) . '<br>' .
                    'Телефон: ' . strip_tags($_POST['phone']) .
                    '</div>';
                break;
        }

        if(!empty($subject)){
            $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
                ->setUsername($config['email'])
                ->setPassword($config['pass']);

            $mailer = Swift_Mailer::newInstance($transport);
            $message = Swift_Message::newInstance($subject)
                ->setFrom([$config['email'] => 'trening.qrgr.ru'])
                ->setTo([$config['email'] => 'trening.qrgr.ru'])
                ->setBody($body, 'text/html');
            $mailer->send($message);
        } else {
            throw new Exception('Произошла ошибка при отправки письма');
        }

        $json_list['result'] = 1;
    } catch (Exception $e) {
        $json_list['message'] = $e->getMessage();
        $json_list['result'] = 0;
    }

    return renderText(json_encode($json_list), true, 'application/json');
}