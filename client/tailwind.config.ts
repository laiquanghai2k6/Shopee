
module.exports = {
    theme: {
      extend: {
        keyframes: {
          jump: {
            '0%': { transform: 'translateY(0)' },
            '30%': { transform: 'translateY(-6px)' },
            '100%': { transform: 'translateY(0)' },
          },
        },
        animation: {
          jump: 'jump 0.3s ease-out',
        },
      },
    },
    plugins: [],
  };
  