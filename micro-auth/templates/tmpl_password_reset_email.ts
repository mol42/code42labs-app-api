import Handlebars from "handlebars";

const template = Handlebars.compile(`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="tr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{header}}</title>
    <style type="text/css">
        body {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            -webkit-text-size-adjust: 100% !important;
            -ms-text-size-adjust: 100% !important;
            -webkit-font-smoothing: antialiased !important;
        }

        .tableContent img {
            border: 0 !important;
            display: block !important;
            outline: none !important;
        }

        a {
            color: #382F2E;
        }

        p, h1, ul, ol, li, div {
            margin: 0;
            padding: 0;
        }

        td, table {
            vertical-align: top;
        }

        td.middle {
            vertical-align: middle;
        }

        a.link1 {
            color: #ffffff;
            font-size: 14px;
            text-decoration: none;
        }

        a.link2 {
            font-size: 13px;
            color: #999999;
            text-decoration: none;
            line-height: 19px;
        }

        .bigger {
            font-size: 24px;
        }

        .bgBody {
            background: #dddddd;
        }

        .bgItem {
            background: #ffffff;
        }

        h2 {
            font-family: Georgia;
            font-size: 36px;
            text-align: center;
            color: #B57801;
            font-weight: normal;
        }

        p {
            color: #ffffff;
        }

        @media only screen and (max-width: 480px) {

            table[class="MainContainer"], td[class="cell"] {
                width: 100% !important;
                height: auto !important;
            }

            td[class="specbundle"] {
                width: 100% !important;
                float: left !important;
                font-size: 13px !important;
                line-height: 17px !important;
                display: block !important;
                padding-bottom: 15px !important;
            }

            td[class="specbundle2"] {
                width: 90% !important;
                float: left !important;
                font-size: 14px !important;
                line-height: 18px !important;
                display: block !important;
                padding-bottom: 10px !important;
                padding-left: 5% !important;
                padding-right: 5% !important;
            }

            td[class="spechide"] {
                display: none !important;
            }

            img[class="banner"] {
                width: 100% !important;
                height: auto !important;
            }

            td[class="left_pad"] {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

        }

        @media only screen and (max-width: 540px) {

            table[class="MainContainer"], td[class="cell"] {
                width: 100% !important;
                height: auto !important;
            }

            td[class="specbundle"] {
                width: 100% !important;
                float: left !important;
                font-size: 13px !important;
                line-height: 17px !important;
                display: block !important;
                padding-bottom: 15px !important;
            }

            td[class="specbundle2"] {
                width: 90% !important;
                float: left !important;
                font-size: 14px !important;
                line-height: 18px !important;
                display: block !important;
                padding-bottom: 10px !important;
                padding-left: 5% !important;
                padding-right: 5% !important;
            }

            td[class="spechide"] {
                display: none !important;
            }

            img[class="banner"] {
                width: 100% !important;
                height: auto !important;
            }

            td[class="left_pad"] {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }

        }

    </style>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
</head>
<body class='bgBody' style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;">

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='font-family:helvetica, sans-serif;'>
    <tbody>
    <tr>
        <td>
            <table style="padding-bottom:30px; padding-top:30px" width="600" border="0" cellspacing="0" cellpadding="0" align="center" class="MainContainer">
                <tbody>
                <tr>
                    <td class='movableContentContainer'>
                        <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td height='22' bgcolor='#301F5D'></td>
                                </tr>
                                <tr>
                                    <td bgcolor='#301F5D'>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td valign="top" width="20" class="spechide">&nbsp;</td>
                                                <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" width="340" class="specbundle2">
                                                                <div class="contentEditableContainer contentImageEditable">
                                                                    <div class="contentEditable" style="text-align: center; color: white; font-weight: 600; font-size:23px">
                                                                        <div style="display: flex; justify-content: center; align-items: center; margin : 10px;">
                                                                        
                                                                        </div>
                                                                        <div style="padding: 10px">{{header}}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top" width="20" class="spechide">&nbsp;</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>

                                </tbody>
                            </table>

                        </div>
                        <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height='22' bgcolor='#301F5D'></td>
                                </tr>
                            </table>
                        </div>
                        <div class="movableContent" style="border: 0; padding-top: 0; position: relative;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor='#fff'>
                                <tr>
                                    <td height='15' colspan='3'></td>
                                </tr>
                                <tr>
                                    <td width='50'></td>
                                    <td style="padding-bottom:35px;padding-top:35px">
                                        <table border="0" cellspacing="0" cellpadding="0" style="width:100%">
                                            <tr>
                                                <td>
                                                    <div class="contentEditableContainer contentTextEditable">
                                                        <div style='font-family: Roboto, sans-serif;text-align:left;' class="contentEditable">
                                                            <p style='font-size:18px;color:#555;'>Merhaba {{firstName}} !</b>
                                                            <br/><br />
                                                            <p style='font-size:18px;color:#555;'>
                                                                <b>Code42Labs</b> şifrenizi yeniden belirlemek için gerekli kod aşağıdadır. 
                                                            </p>
                                                            <br/><br/>
                                                            <p style='font-size:18px;color:#555;'>
                                                                Bu kodu uygulamanın şifre belirleme ekranında girerek şifrenizi belirleyebilirsiniz.
                                                            </p>
                                                            <br/><br/>
                                                            <div style="display: flex; justify-content: center; align-items: center;">
                                                                <p style='font-size:22px;color:#000;'>{{code}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height='25'></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width='50'></td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>
`);

export default template;
