<template>
  <div id="LoginBody">
   <div class="con">
     <form action="">
       <h2>Login</h2>
       <div class="title">用户名</div>
       <div class="content"><input type="text"></div>
       <div class="title">密码</div>
       <div class="content"><input type="text"></div>
       <div class="go">
         <input @click="runToF" type="submit" value="sign in" >
       </div>
     </form>
   </div>
  </div>
</template>

<script>

export default {
  name: "login",
  methods: {
    runToF() {
      console.log('runToF')
      // 模拟登录成功
      // 触发登录成功事件
      this.$emit('loginSuccess')
    },

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
#LoginBody{
  background-image: url('../../src/assets/20201012103034640.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.con{
  position: relative;
  width: 300px;
  height: 370px;
  background-image: linear-gradient(to right top,rgba(4, 97, 110,0.6),rgba(183, 215, 201,0.7),rgba(99,94,147,0.5),rgba(251,252,253,0.5));
}
.con::before{
  position: absolute;
  border: 1px solid white;
  top: 0;
  right: 0;
  box-sizing: border-box;
  content: "";
  width: 300px;
  height: 370px;
  clip-path: inset(0 130px 250px 0);
  animation: ch 8s infinite;
}
@keyframes ch{
  0%,100%{
    clip-path: inset(0 0 368px 0);
  }
  25%{
    clip-path: inset(0 258px 0 0);
  }
  50%{
    clip-path: inset(368px 0 0 0);
  }
  75%{
    clip-path: inset(0 0 0 258px);
  }
}
.con form{
  width: 75%;
  height: 5%;
  margin: 50px auto;
}
.con .title{
  width: 100px;
  margin: 20px auto 0;
  font-size: 19px;
  color: white;
  font-weight: 520;
  text-align: center;
  text-rendering: auto;
}
.con .content input{
  width: 100%;
  border: none;
  outline: none;
  background-color: rgba(0,0,0,0);
  box-shadow: 0 2px 0 rgba(255,255,255);
  color: white;
}
.con h2{
  color: white;
  text-shadow: 0 1px 0 slateblue;
}
.go{
  width: 100px;
  margin: 50px auto;
  position: relative;
}
.go input{
  width: 100px;
  margin: auto;
  font-size: 22px;
  border: none;
  outline: none;
  background-color: rgba(0,0,0,0);
  color: white;
  font-weight: bolder;
}
.go:hover input{
  text-shadow: 0 2px 3px rgb(255,255,255);
}
</style>
