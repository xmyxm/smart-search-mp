const project_config = require("../project.config.json");
const child_process = require("child_process");
const ci = require("miniprogram-ci");
const inquirerPrompt = require("@inquirer/prompts");
const request = require("request");
const fse = require("fs-extra");
const util = require("util");
const path = require("path");
const fs = require("fs");

const example = {
    appid: "",  // 小程序的appid
    name: "",  // 小程序的名字
    choices: [
        "开发版-dev",
        "演示版-rep",
        "体验版-pre",
    ],
    robot_1: 1, // 机器人 1 号
    robot_2: 2, // 机器人 2 号
    robot_3: 3, // 机器人 3 号
    version: "1.0.0",
};

class appletCI {
    exec = util.promisify(child_process.exec);
    config = {};
    // 流水线执行上传操作方法
    async init() {
        const result_data = await this.inquirer(project_config);
        this.config = await this.update_config(result_data);
        this.fs_rewrite_config();
        await this.upload(result_data);
    }
    // 问答：选择环境、版本号、描述
    async inquirer(config) {
        const env = await inquirerPrompt.select({
            message: "请选择部署环境：",
            default: 0,
            choices: example.choices,
        });
        const version = await inquirerPrompt.input({
            message: `设置上传的版本号（当前版本号：${config.version || ''}）:`,
        });
        const desc = await inquirerPrompt.input({
            message: "请写一个简单的介绍来描述这个版本改动过：",
        });
        return {
            env,
            version,
            desc,
        };
    }
    // 更新配置信息
    async update_config(user_info) {
        const env = user_info.env.split("-")[1];
        const env_desc = user_info.env.split("-")[0];
        const config = {
            appid: "",  // 小程序的appid
            name: "",  // 小程序的名字
            env,
            env_desc,
            version: user_info.version,
            desc: user_info.desc || env_desc,
            robot:
                env === "prod" || env === "pre"
                    ? example.robot_3
                    : env === "rep"
                        ? example.robot_2
                        : example.robot_1,
        };

        return config;
    }
    // 重写配置文件
    fs_rewrite_config() {
        fs.writeFileSync(
            "./project.config.json",
            JSON.stringify(this.config),
            (err) => {
                if (err) {
                    console.log(
                        "自动写入 project.config.json 文件失败，请手动填写，并检查错误！"
                    );
                }
            }
        );
    }
    // 打包上传
    async upload() {
        const {
            appid = "",  // 小程序的appid
            name = "",  // 小程序的名字
            env = "test3",
            env_desc = "测试环境3",
            desc = "测试环境3",
            robot = example.robot_1,
            version = example.version,
        } = this.config || {};

        console.log(`${env_desc}正在打包`);
        this.message(`${name}小程序-${env_desc}，正在部署`);
        await this.exec(`npm run build:mp-weixin-${env}`, { cwd: "./" });
        await this.copyFiles();
        console.log(`${env_desc}正在部署`);
        const project = new ci.Project({
            appid,
            type: "miniProgram",
            projectPath: path.join(__dirname, "./dist/build/mp-weixin"),
            privateKeyPath: path.join(__dirname, "./private." + appid + ".key"),
            ignores: ["node_modules/**/*", ".vscode", ".hbuilderx"],
        });

        await ci
            .upload({
                project,
                robot,
                desc,
                version,
                onProgressUpdate: console.log,
            })
            .then(() => {
                this.message(`${name}小程序-${env_desc}，部署完成`);
                console.log("部署完成");
            })
            .catch((error) => {
                if (error.errCode == -1) {
                    this.message(`${name}小程序-${env_desc}，部署完成`);
                    console.log("部署完成");
                    return;
                }
                this.message(`${name}小程序-${env_desc}，部署失败，原因为：${error}`);
                console.log("部署失败", error);
                process.exit(-1);
            });
    }
    // 复制 project.config 文件至 dist
    async copyFiles() {
        try {
            await fse.copy(
                path.join(__dirname, "./project.config.json"),
                path.join(__dirname, "./dist/build/mp-weixin/project.config.json")
            );
        } catch (err) {
            console.error(err);
        }
    }
    // 发送钉钉消息
    message(content) {
        console.log('\x1B[32m%s\x1B[39m', content);
        // const data = {
        //     msgtype: "text",
        //     text: { content },
        // };
        // request({
        //     url: "",  // 钉钉群里可以看到的webhook地址
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify(data),
        // });
    }
}

const CI = new appletCI();
CI.init();

