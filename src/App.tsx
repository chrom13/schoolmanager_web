import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          duration: 6000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px 20px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
            minWidth: '300px',
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#059669',
              color: '#fff',
            },
          },
          error: {
            duration: 8000,
            iconTheme: {
              primary: '#fef2f2',
              secondary: '#991b1b',
            },
            style: {
              background: '#dc2626',
              color: '#fff',
              fontWeight: '600',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
