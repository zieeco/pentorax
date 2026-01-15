import React from 'react';
import { useAuthStore } from '@/stores/auth';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  ArrowUpRight,
  MoreVertical,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { label: 'Total Revenue', value: '₦2.45M', trend: '+14%', icon: <DollarSign className="h-5 w-5" />, color: 'bg-blue-500' },
    { label: 'Active Orders', value: '1,284', trend: '+8%', icon: <ShoppingCart className="h-5 w-5" />, color: 'bg-emerald-500' },
    { label: 'Pending Support', value: '14', trend: '-2', icon: <TrendingUp className="h-5 w-5" />, color: 'bg-rose-500' },
    { label: 'Total Customers', value: '4,912', trend: '+22%', icon: <Users className="h-5 w-5" />, color: 'bg-amber-500' },
  ];

  const recentOrders = [
    { id: 'ORD-1092', customer: 'Lagos Island Resort', product: '5kW Solar System', priority: 'Critical', status: 'Pending', time: '2h ago' },
    { id: 'ORD-1091', customer: 'Baze University', product: 'Battery Storage 200Ah', priority: 'Medium', status: 'Assigned', time: '4h ago' },
    { id: 'ORD-1088', customer: 'John Doe Residence', product: 'Solar Panel 450W', priority: 'Low', status: 'Resolved', time: '1d ago' },
    { id: 'ORD-1087', customer: 'Industrial Hub 1', product: 'Inverter System', priority: 'High', status: 'Pending', time: '1d ago' },
  ];

  const products = [
    { name: '5kW Solar Inverter', location: 'Lagos Warehouse', stock: 45, status: 'In Stock', health: 98 },
    { name: 'LiFePO4 Battery 200Ah', location: 'Abuja Store', stock: 12, status: 'Low Stock', health: 82 },
    { name: 'Solar Panel 450W Mono', location: 'Port Harcourt', stock: 89, status: 'In Stock', health: 94 },
    { name: 'Charge Controller MPPT', location: 'Kano Branch', stock: 0, status: 'Out of Stock', health: 0 },
  ];

  return (
    <div className="space-y-8 font-sand">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">
          Welcome back, {user?.email?.split('@')[0] || 'there'}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl text-white ${s.color}`}>
                {s.icon}
              </div>
              <span className={`text-xs font-black ${s.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {s.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
            <p className="text-3xl font-black text-gray-900 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products/Inventory Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-black text-lg text-gray-900">Live Inventory Status</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All Products</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Health</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((prod, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{prod.name}</div>
                      <div className="text-[10px] text-gray-400 flex items-center">
                        <MapPin className="h-2.5 w-2.5 mr-1" /> {prod.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">{prod.stock} units</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${prod.health > 90 ? 'bg-emerald-500' : prod.health > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                            style={{ width: `${prod.health}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">{prod.health}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                        prod.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                        prod.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                          prod.status === 'In Stock' ? 'bg-emerald-500' : 
                          prod.status === 'Low Stock' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                        }`}></span>
                        {prod.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-gray-900">Monthly Sales</h3>
            <div className="p-2 bg-gray-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-end justify-between h-48 space-x-2">
              {[40, 65, 45, 90, 75, 55, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-primary/10 rounded-t-lg transition-all group-hover:bg-primary relative" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ₦{h*10}k
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 mt-2 uppercase">Day {i+1}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-bold">Total Forecast</span>
                <span className="text-gray-900 font-black">₦4.2M</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Orders Section */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black">Urgent Orders</h3>
              <p className="text-white/50 text-xs mt-1">Personnel assigned to 85% of pending items.</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 transition-all px-6 py-2 rounded-xl text-sm font-bold flex items-center space-x-2">
              <span>View Order Queue</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentOrders.map((order, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black tracking-widest text-primary uppercase">{order.id}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                    order.priority === 'Critical' ? 'bg-rose-500 text-white' : 
                    order.priority === 'High' ? 'bg-amber-500 text-white' : 
                    order.priority === 'Medium' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60'
                  }`}>
                    {order.priority}
                  </span>
                </div>
                <h4 className="font-bold text-gray-100 group-hover:text-primary transition-colors truncate">{order.customer}</h4>
                <p className="text-xs text-white/40 mt-1">{order.product}</p>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-white/60 font-bold flex items-center">
                    <Calendar className="h-3 w-3 mr-1 opacity-40" /> {order.time}
                  </span>
                  <span className={`font-black uppercase flex items-center ${order.status === 'Resolved' ? 'text-emerald-400' : 'text-primary'}`}>
                    {order.status === 'Resolved' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
