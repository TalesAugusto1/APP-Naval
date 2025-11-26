export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('Network') || error.message.includes('network')) {
      return 'Sem conexão com a internet. Verifique sua rede e tente novamente.';
    }
    if (error.message.includes('404')) {
      return 'Item não encontrado. Pode ter sido excluído.';
    }
    if (error.message.includes('timeout')) {
      return 'A operação demorou muito. Tente novamente.';
    }
    return error.message;
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('Network') ||
      error.message.includes('network') ||
      error.message.includes('fetch')
    );
  }
  return false;
}
