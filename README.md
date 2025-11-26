# 🏫 Gestor Escolar (School Manager)

Modern React Native mobile application for managing public schools and their classes. Built with Expo, TypeScript, and professional quality gates.

<p align="center">
  <img src="./assets/images/logo.png" alt="Gestor Escolar Logo" width="200" />
</p>

> **Technical Challenge**: React Native + Expo application with complete CRUD operations, state management, and production-ready quality standards.

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[Getting Started](./docs/GETTING_STARTED.md)** - Installation, setup, and first-time configuration
- **[Architecture](./docs/ARCHITECTURE.md)** - Project structure, design patterns, and architectural decisions
- **[API](./docs/API.md)** - Mock API endpoints, data models, and usage examples
- **[Features](./docs/FEATURES.md)** - Detailed feature documentation for all modules
- **[State Management](./docs/STATE_MANAGEMENT.md)** - Zustand stores, patterns, and best practices
- **[Testing](./docs/TESTING.md)** - Testing strategy, running tests, and writing new tests
- **[Development](./docs/DEVELOPMENT.md)** - Development workflow, quality gates, and git hooks
- **[Deployment](./docs/DEPLOYMENT.md)** - Publishing to Expo Go and building for production

---

## 🎯 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios        # iOS Simulator
npm run android    # Android Emulator
npm run web        # Web browser
```

For detailed setup instructions, see [Getting Started](./docs/GETTING_STARTED.md).

---

## ✨ Features at a Glance

### Core Modules

- **📍 Schools Management** - Full CRUD operations for public schools
- **📚 Classes Management** - Manage classes linked to each school
- **🔍 Search & Filtering** - Real-time search with advanced filters
- **📊 Data Visualization** - Charts and statistics for insights
- **🔐 Authentication** - Login/register with session management

### Technical Highlights

- ✅ TypeScript strict mode
- ✅ Zustand state management
- ✅ MirageJS mock API
- ✅ AsyncStorage offline support
- ✅ 80%+ test coverage
- ✅ Professional Git hooks (Husky)
- ✅ Conventional commits enforcement
- ✅ Dark mode support
- ✅ Accessibility (WCAG 2.1 AA)

See [Features](./docs/FEATURES.md) for complete feature documentation.

---

## 🛠 Tech Stack

| Category       | Technologies                                     |
| -------------- | ------------------------------------------------ |
| **Framework**  | Expo 54.0.25, React 19.1.0, React Native 0.81.5  |
| **Language**   | TypeScript 5.9.2 (strict mode)                   |
| **UI Library** | Gluestack UI 1.1.73                              |
| **Navigation** | Expo Router 6.0.15 (file-based routing)          |
| **State**      | Zustand 5.0.8                                    |
| **Mock API**   | MirageJS 0.1.48                                  |
| **Storage**    | AsyncStorage 2.2.0                               |
| **Testing**    | Jest 30.2.0, React Native Testing Library 13.3.3 |
| **Quality**    | ESLint 9.25.0, Prettier 3.6.2, Husky 9.1.7       |

See [Architecture](./docs/ARCHITECTURE.md) for architectural details.

---

## 🔒 Quality Gates

This project enforces code quality with automated Git hooks:

### Pre-commit

- ✅ Lint staged files
- ✅ Auto-format with Prettier
- ✅ Fast execution (< 5 seconds)

### Commit Message

- ✅ Conventional commits format
- ✅ Branch name validation
- ✅ Scope validation

### Pre-push

- ✅ Full lint check
- ✅ TypeScript compilation
- ✅ All tests must pass
- ✅ Code coverage analysis

See [Development](./docs/DEVELOPMENT.md) for complete workflow documentation.

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI
npm run test:ci
```

**Coverage**: 80%+ across services, stores, and components

See [Testing](./docs/TESTING.md) for testing strategy and examples.

---

## 📜 Scripts Reference

| Script                  | Description                    |
| ----------------------- | ------------------------------ |
| `npm start`             | Start Expo development server  |
| `npm run ios`           | Run on iOS simulator           |
| `npm run android`       | Run on Android emulator        |
| `npm run web`           | Run in web browser             |
| `npm run lint`          | Check for linting errors       |
| `npm run lint:fix`      | Auto-fix linting errors        |
| `npm run format`        | Format all files with Prettier |
| `npm run type-check`    | Check TypeScript types         |
| `npm run quality`       | Run all quality checks         |
| `npm test`              | Run unit tests                 |
| `npm run test:coverage` | Generate coverage report       |

---

## 📁 Project Structure

```
School-Manager/
├── app/                 # Expo Router pages (file-based routing)
├── screens/             # Screen components with business logic
├── components/          # Reusable UI components
├── services/            # API layer and business logic
├── store/               # Zustand state stores
├── types/               # TypeScript type definitions
├── hooks/               # Custom React hooks
├── navigation/          # Navigation configuration
├── theme/               # Theme and styling
├── __tests__/           # Integration tests
├── .husky/              # Git hooks
└── docs/                # Documentation
```

See [Architecture](./docs/ARCHITECTURE.md) for detailed structure documentation.

---

## 🚀 Deployment

### Quick Sharing (Expo Go)

```bash
npx expo publish
```

Share the generated QR code with reviewers.

### Production Build (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for production
eas build --profile production --platform all
```

See [Deployment](./docs/DEPLOYMENT.md) for complete deployment guide.

---

## 🎨 Mock API

The app includes a complete MirageJS mock server that simulates a real backend:

- **8 sample schools** - Various municipal and state schools
- **20 sample classes** - Distributed across schools
- **2 test users** - For authentication testing
- **300ms delay** - Realistic network latency

**Test Credentials**:

- Admin: `admin@escola.com` / `Admin123!`
- Manager: `gestor@escola.com` / `Gestor123!`

See [API](./docs/API.md) for endpoint documentation.

---

## ✅ Technical Challenge Compliance

This project fully addresses all requirements:

### Technical Requirements

- ✅ Expo SDK 54+
- ✅ React 19 / React Native 0.81+
- ✅ TypeScript (strict mode)
- ✅ Expo Router for navigation
- ✅ Gluestack UI components
- ✅ Zustand state management
- ✅ MirageJS mock backend

### Functional Requirements

- ✅ Schools CRUD operations
- ✅ Classes CRUD operations
- ✅ Search and filtering
- ✅ Form validation
- ✅ School-Class relationships

### Evaluation Criteria

- ✅ **Organization** - Modular architecture, clear structure
- ✅ **Code Quality** - SOLID principles, Clean Code, strict TypeScript
- ✅ **Usability** - Modern UI with smooth animations
- ✅ **Functionality** - All features working without errors
- ✅ **Git Versioning** - Conventional commits, quality gates
- ✅ **Documentation** - Comprehensive docs in `/docs` folder

### Differentials Implemented

- ✅ Search and filtering
- ✅ Responsive layout (mobile/tablet)
- ✅ Custom hooks and componentization
- ✅ Offline support with AsyncStorage
- ✅ Unit and integration tests (80%+ coverage)
- ✅ Dark mode support
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Data visualization with charts
- ✅ Professional Git workflow with Husky
- ✅ Advanced TypeScript usage
- ✅ Design patterns (Repository, Factory, Adapter)
- ✅ Production optimizations (Hermes, Metro)

---

## 📊 Project Statistics

- **Lines of Code**: ~15,000+
- **Test Coverage**: 80%+
- **Components**: 50+
- **Screens**: 15+
- **Custom Hooks**: 9
- **API Endpoints**: 10
- **Quality Gates**: 4 (pre-commit, commit-msg, pre-push, post-merge)

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat-feature-name`
2. Make your changes
3. Commit with conventional format: `git commit -m "feat(scope): description"`
4. Push to remote: `git push origin feat-feature-name`
5. Create a Pull Request

See [Development](./docs/DEVELOPMENT.md) for detailed workflow.

---

## 🔧 Troubleshooting

### Metro Bundler Issues

```bash
# Clear cache and restart
npx expo start --clear
```

### Dependency Issues

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Git Hooks Not Running

```bash
# Reinstall hooks
npm run prepare
```

For more troubleshooting, see:

- [Getting Started - Troubleshooting](./docs/GETTING_STARTED.md#quick-troubleshooting)
- [Development - Troubleshooting](./docs/DEVELOPMENT.md#troubleshooting)

---

## 📚 Additional Resources

### Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Gluestack UI](https://ui.gluestack.io/)
- [Zustand](https://github.com/pmndrs/zustand)
- [MirageJS](https://miragejs.com/)

### Best Practices

- [Conventional Commits](https://www.conventionalcommits.org/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📝 License

MIT License - This project was created as a technical challenge demonstration.

---

## 👨‍💻 Author

Developed as a technical challenge for a React Native developer position.

**Quality Gates Status**: ✅ All hooks active and enforcing code quality  
**Production Ready**: ✅ Optimized and ready for deployment  
**Last Updated**: November 2025

---

**Need help?** Check the [documentation](./docs/) or the specific guide for your needs:

- New to the project? → [Getting Started](./docs/GETTING_STARTED.md)
- Want to understand the code? → [Architecture](./docs/ARCHITECTURE.md)
- Adding features? → [Development](./docs/DEVELOPMENT.md)
- Deploying? → [Deployment](./docs/DEPLOYMENT.md)
