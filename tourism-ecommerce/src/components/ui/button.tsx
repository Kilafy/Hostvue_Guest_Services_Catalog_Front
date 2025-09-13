import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
          {
            "text-white hover:opacity-90 active:opacity-80 shadow-orange-500/25 hover:shadow-orange-500/40": variant === 'default',
            "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-red-500/25 hover:shadow-red-500/40": variant === 'destructive',
            "border border-neutral-300 bg-white hover:bg-neutral-50 hover:border-neutral-400 text-neutral-700 active:bg-neutral-100": variant === 'outline',
            "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:bg-neutral-300": variant === 'secondary',
            "hover:bg-neutral-100 hover:text-neutral-800 text-neutral-600": variant === 'ghost',
            "text-orange-600 underline-offset-4 hover:underline hover:text-orange-700": variant === 'link',
          },
          {
            "h-10 px-6 py-2": size === 'default',
            "h-8 rounded-md px-3 text-xs": size === 'sm',
            "h-12 rounded-lg px-10 text-base": size === 'lg',
            "h-10 w-10": size === 'icon',
          },
          className
        )}
        style={variant === 'default' ? { backgroundColor: '#D87441' } : undefined}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
