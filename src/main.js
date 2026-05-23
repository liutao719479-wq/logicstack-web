import { createApp } from 'vue'
import { ElDrawer, ElIcon, ElInput } from 'element-plus'
import 'element-plus/es/components/base/style/css'
import 'element-plus/es/components/drawer/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/input/style/css'
import App from './App.vue'
import router from './router'
import './styles/theme.css'
import './styles/base.css'
import './styles/hao-pages.css'

const app = createApp(App)

app.component(ElDrawer.name, ElDrawer)
app.component(ElIcon.name, ElIcon)
app.component(ElInput.name, ElInput)

app.use(router).mount('#app')
