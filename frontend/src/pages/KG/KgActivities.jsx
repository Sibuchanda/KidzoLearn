import { FaPalette, FaSortNumericUpAlt, FaFont, FaDog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    name: 'Color Identification',
    icon: <FaPalette className="text-4xl text-white" />,
    bgColor: 'bg-red-400',
    route: '/ColorRecognition',
  },
  {
    name: 'Number Identification',
    icon: <FaSortNumericUpAlt className="text-4xl text-white" />,
    bgColor: 'bg-green-400',
    route: '/NumberRecognition',
  },
  {
    name: 'Alphabet Identification',
    icon: <FaFont className="text-4xl text-white" />,
    bgColor: 'bg-blue-400',
    route: '/AlphabetRecognition',
  },
  {
    name: 'Animal Sound Game',
    icon: <FaDog className="text-4xl text-white" />,
    bgColor: 'bg-yellow-400',
    route: '/AnimalSounds',
  },
];

export default function KGActivities() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">🧸 KG Activities</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {activities.map((activity) => (
          <div
            key={activity.name}
            onClick={() => navigate(activity.route)}
            className={`cursor-pointer ${activity.bgColor} p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-white transition-transform hover:scale-105`}
          >
            {activity.icon}
            <h2 className="mt-4 text-xl font-semibold text-center">{activity.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
