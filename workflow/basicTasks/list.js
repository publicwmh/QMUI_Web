/* eslint-disable no-console */
/**
 * Tencent is pleased to support the open source community by making QMUI Web available.
 * Copyright (C) 2019 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

const calculateMargin = require('../calculateMargin.js');

// 显示 QMUI Web 的版本号
module.exports = (gulp, mix) => {

    const taskName = 'list';

    gulp.task(taskName, done => {
        const marginData = calculateMargin(mix.tasks);
        const margin = marginData.margin;
        const optionsBuffer = marginData.hasOptions ? '  --' : '';

        console.log('');
        console.log('Usage');
        console.log('  gulp [TASK] [OPTIONS...]');
        console.log('');
        console.log('Available tasks');

        Object.keys(mix.getAllTask()).forEach(name => {

            const help = mix.getTask(name);

            const args = [' ', mix.util.colors.cyan(name)];

            args.push(new Array(margin - name.length + 1 + optionsBuffer.length).join(' '));

            if (help.description) {
                args.push(help.description);
            }

            if (help.options) {
                const options = Object.keys(help.options);
                options.forEach(option => {
                    const optText = help.options[option];
                    args.push('\n ' + optionsBuffer + mix.util.colors.cyan(option) + ' ');

                    args.push(new Array(margin - option.length + 1).join(' '));
                    args.push(optText);
                });
            }

            console.log.apply(console, args);
        });

        console.log('');

        done();
    });

    // 任务说明
    mix.addTaskDescription(taskName, 'QMUI 内置工作流帮助菜单');
};
