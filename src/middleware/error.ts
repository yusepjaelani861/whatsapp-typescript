import colors from 'colors';
import fs from 'fs';

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
    if (!err.message) {
        let message_error =
            '=====================' + new Date() + '=====================' +
            ' \r' +
            err.stack +
            ' \r' +
            '=======================================================================================================';

        let message_console =
            '=====================' + new Date() + '=====================' +
            ' \n' +
            err.stack +
            ' \n' +
            '=======================================================================================================';

        fs.appendFile('error.log',
            message_error, function (err) {
                if (err) throw err;
            })

        console.log(message_console.red);
    }
}

export default errorHandler;