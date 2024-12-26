import { Moon, Brain, Heart, Star } from 'lucide-react';
import { Theme } from '../types';

interface AboutProps {
  theme: Theme;
}

export const About = ({ theme }: AboutProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Moon className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">喵哥解梦</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          探索梦境的奥秘，寻找内心的答案
        </p>
      </div>

      <div className="space-y-8">
        <section className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold">什么是喵哥解梦？</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            喵哥解梦是一款智能梦境解析应用，通过先进的AI技术，为您提供专业、富有洞察力的梦境解读。我们致力于帮助您理解梦境背后的深层含义，探索潜意识世界。
          </p>
        </section>

        <section className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold">我们的特色</h2>
          </div>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
              <span>专业的梦境解析：结合心理学理论与东方传统解梦智慧</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
              <span>即时解答：随时随地获取梦境解读，探索内心世界</span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
              <span>安全私密：您的梦境记录安全存储，完全保密</span>
            </li>
          </ul>
        </section>

        <section className={`p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-semibold">使用方法</h2>
          </div>
          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p>1. 在主页输入框中描述您的梦境内容</p>
            <p>2. 点击发送按钮，等待AI解析</p>
            <p>3. 获取专业的梦境解读和建议</p>
            <p>4. 可以保存历史记录，随时回顾</p>
          </div>
        </section>
      </div>
    </div>
  );
};
