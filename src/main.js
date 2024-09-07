import {SourceMapConsumer} from 'source-map';
import {readFileSync} from 'fs';

/**
 * 解析源映射并打印源信息
 * @param {string} mapString - 源映射字符串
 * @param {number} line - 错误发生的行号
 * @param {number} [column] - 错误发生的列号（可选）
 */
export function printSourceInfo(mapString, line, column, callback) {
    if (mapString.trim() === "") throw new Error("Invalid map string.");
    SourceMapConsumer.with(mapString, null, (consumer) => {
        callback(consumer.originalPositionFor({
            line,
            column
        }))
    }).catch((error) => {
        console.error('Failed to parse source map:', error);
    });
}

const line = 8848; // 示例行号
const column = 999; // 示例列号（可选）如果没有精确列号就不要动

// 读取 ./main.js.map
var mapString = ""
try {
    mapString = readFileSync('../main.js.map', 'utf8');
} catch (e) {
    console.log("读取文件失败")
    console.error(e)
}

printSourceInfo(mapString, line, column, (data) => {
    console.log(data)
});
