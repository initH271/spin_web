# Spin Wheel Game - 用户认证系统

## 功能特性

### 用户认证
- ✅ 用户注册（邮箱 + 验证码 + 密码）
- ✅ 用户登录（邮箱 + 密码）
- ✅ 用户登出
- ✅ 邮箱验证
- ✅ 发送验证码
- ✅ 忘记密码流程
- ✅ 密码重置

### 状态管理
- ✅ 使用 Zustand 管理用户状态
- ✅ 本地持久化存储
- ✅ JWT Token 自动管理
- ✅ 游戏状态管理

### UI 组件
- ✅ 响应式设计（移动端 + PC端）
- ✅ 表单验证
- ✅ 错误提示
- ✅ 加载状态
- ✅ 验证码倒计时

## 技术栈

- **前端框架**: React 19 + TypeScript
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **UI 框架**: Tailwind CSS
- **通知**: Sonner
- **构建工具**: Vite

## 项目结构

```
src/
├── api/                    # API 接口
│   ├── authService.ts     # 用户认证相关接口
│   ├── spinService.ts     # 转盘游戏相关接口
│   ├── prizeService.ts    # 奖品管理相关接口
│   ├── homepageService.ts # 主页数据相关接口
│   ├── formService.ts     # 表单相关接口
│   ├── apiClient.ts       # HTTP 客户端配置
│   └── index.ts           # API 统一导出
├── store/                 # 状态管理
│   ├── userStore.ts       # 用户状态管理
│   ├── gameStore.ts       # 游戏状态管理
│   └── index.ts           # Store 统一导出
├── components/            # 组件
│   ├── Header.tsx         # 头部组件
│   └── modal/
│       └── authModal.tsx  # 认证模态框
└── App.tsx               # 主应用组件
```

## 使用方法

### 1. 用户登录

```typescript
import { useUserStore } from './store';

const { login, isLoggedIn, user } = useUserStore();

// 登录后会自动更新状态
console.log('Is logged in:', isLoggedIn);
console.log('User info:', user);
```

### 2. 发送验证码

```typescript
import { authService } from './api';

// 发送注册验证码
await authService.sendVerificationCode({ email: 'user@example.com' });

// 发送忘记密码验证码
await authService.forgotPasswordSendCode({ email: 'user@example.com' });
```

### 3. 用户注册

```typescript
import { authService } from './api';

const response = await authService.register({
  email: 'user@example.com',
  password: 'password123',
  verification_code: '1234'
});
```

### 4. 用户登录

```typescript
import { authService } from './api';

const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});
```

### 5. 密码重置

```typescript
import { authService } from './api';

await authService.resetPassword({
  email: 'user@example.com',
  code: '1234',
  password: 'newpassword123',
  confirm_password: 'newpassword123'
});
```

### 6. 用户登出

```typescript
import { useUserStore } from './store';

const { logout } = useUserStore();
logout(); // 清除所有用户数据
```

## API 接口

### 认证相关接口

- `POST /api/register/` - 用户注册
- `POST /api/login/` - 用户登录
- `POST /api/logout/` - 用户登出
- `POST /api/verify-email/` - 邮箱验证
- `POST /api/send-verification-code/` - 发送验证码
- `POST /api/forgot-password-send-code/` - 发送忘记密码验证码
- `POST /api/reset-password/` - 重置密码

### 游戏相关接口

- `POST /api/spin/` - 转盘游戏
- `GET /api/daily-spin-status/` - 获取每日转盘状态
- `GET /api/user-prizes/` - 获取用户奖品列表
- `POST /api/claim-prize/` - 领取奖品
- `GET /api/homepage/` - 获取主页数据

## 状态管理

### 用户状态 (userStore)

```typescript
interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}
```

### 游戏状态 (gameStore)

```typescript
interface GameState {
  currentWheelInstanceId: number | null;
  spinResult: SpinResponseData | null;
  dailySpinStatus: DailySpinStatus | null;
  isLoading: boolean;
  error: string | null;
}
```

## 开发说明

1. **环境要求**: Node.js 18+, pnpm
2. **安装依赖**: `pnpm install`
3. **启动开发服务器**: `pnpm dev`
4. **构建生产版本**: `pnpm build`

## 注意事项

1. 所有API请求会自动添加JWT token到请求头
2. 用户状态会自动持久化到localStorage
3. 验证码有60秒倒计时限制
4. 密码最少6位字符
5. 邮箱格式会自动验证

## 后续开发

- [ ] 添加用户头像上传
- [ ] 实现社交登录（Google, Facebook等）
- [ ] 添加用户资料管理
- [ ] 实现邮箱验证流程
- [ ] 添加用户活动日志
- [ ] 实现管理员后台
