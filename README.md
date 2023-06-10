# vue-vuetom-admin

Preview

[netlify](https://admin.vuetom.top)
[vercel](https://vue-vuetom-admin.vercel.app)

基于 vite4.x + vue3.x + vuetify3.x + ts5.x 的后台管理系统模板

Documents

- [vue3 staging](https://staging-cn.vuejs.org/guide/introduction.html)
- [vuetify3](https://next.vuetifyjs.com/en/getting-started/installation/)
- [vercel dashboard](https://vercel.com/dashboard)

## 快速开始

- 拉取项目

```bash
git clonen https://github.com/lauset/vue-vuetom-admin
```

- 安装依赖

```bash
cd vue-vuetom-admin

pnpm i
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

- 预览

```bash
pnpm preview
```

- 部署

vercel

netlify

## 待办项

- [x] 登录、Haut登录
- [x] 暗黑主题
- [x] redis 服务
- [x] vercel 部署
- [x] tsx 语法
- [ ] 布局风格
- [ ] 其他...

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
