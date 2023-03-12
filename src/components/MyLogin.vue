<template>
<div class="whole">
    <div class="content">
        <div class="login-box">
            <h1>SIGN IN</h1>
            <div class="output-frame">
                <label for="username">账号</label>
                <input type="text" id="username" autofocus>
            </div>
            <div class="output-frame">
                <label for="password">密码</label>
                <input type="password" id="password">
            </div>
            <el-button type="primary" round class="login-btn" @click="iptmsg" color="#0ee3ab">登录</el-button>

        </div>
    </div>
</div>
</template>

<script>
import {
    ElMessage
} from 'element-plus'
export default {
    name: 'MyLogin',
    data() {
        return {
            username: 'admin',
            password: 'admin123',
            islogin: true,
            dialogVisible: false,
        }
    },
    methods: {
        iptmsg() {
            const btnbg = document.getElementsByClassName("login-btn")
            const iptusername = document.getElementById("username")
            const iptpassword = document.getElementById("password")
            if (this.password === iptpassword.value && this.username === iptusername.value) {
                this.$router.push({
                    path: '/managepage',
                    query: {
                        username: this.username
                    }
                })
            } else {
                const open = () => {
                    ElMessage({
                        showClose: true,
                        message: '账号或密码错误了喔~~~',
                        type: 'info',
                        center: true,
                        offset: 320,

                    })
                }
                open()
            }
        },
        enters() {
            document.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    this.iptmsg()
                }

            })
        },
    },
    mounted() {
        this.enters()
    }

}
</script>

<style lang="less" scoped>
.content {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: antiquewhite;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.content::before {
    position: absolute;
    content: "";
    display: block;
    width: 300%;
    height: 100%;
    background-image: linear-gradient(to bottom right, rgb(0, 253, 186), rgb(0, 151, 252));
    filter: blur(4px);
    animation: bg-anim 2.5s alternate infinite linear;

}

@keyframes bg-anim {
    from {
        left: 0;
    }

    to {
        left: -200%;
    }
}

.login-box {
    position: relative;
    width: 400px;
    height: 400px;
    background-color: rgba(74, 0, 170, 0.3);
    border-radius: 30px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-box>h1 {
    margin: 50px 0 10px 0;
    font-size: 64px;
}

.output-frame {
    margin-top: 20px;
    width: 300px;
    height: 40px;

    display: flex;
}

.output-frame>label {
    font-size: 16px;
    width: 64px;
    background-color: rgba(14, 227, 171, 0.7);
    border-radius: 40px 10px 10px 40px;
    text-indent: 20px;

    display: flex;
    align-items: center;
}

.output-frame>input {
    flex: 1;
    width: 0;
    margin-left: 6px;
    padding: 0 20px 0 10px;
    border-radius: 10px 40px 40px 10px;
    outline: none;
    border: none;
    font-size: 20px;
    background-color: rgba(74, 0, 170, 0.3);
    color: #fff;
}

.output-frame>input:focus {
    color: #000;
    background-color: #fff;
}

.login-btn {
    margin-top: 40px;
    width: 200px;
    height: 40px;
    font-size: 20px;
    border: none;
    color: #fff;
    border-radius: 40px;
}
</style>
