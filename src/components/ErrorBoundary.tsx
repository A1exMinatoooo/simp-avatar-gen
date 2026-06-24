import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  handleReset = () => {
    try {
      localStorage.removeItem('avatar-gen-config')
    } catch {
      // ignore
    }
    this.setState({ hasError: false })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">页面出错了</h2>
            <p className="text-gray-600 mb-6">可能是配置数据损坏，重置后将恢复正常。</p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              重置并刷新
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
