import { useAuthStore } from '@/stores/auth';
import { Link } from 'react-router-dom';
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
import { useProductsPaginated, useUpdateProduct } from '@/hooks/products.hooks';
import { toast } from 'sonner';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  
  const { data: productData, isLoading } = useProductsPaginated({ per_page: 4 });
  const { mutate: updateProduct } = useUpdateProduct();
  const products = productData?.results || [];

  const handleRestock = (slug: string, currentStock: number) => {
    const input = prompt('Enter new stock quantity:', currentStock.toString());
    if (input !== null) {
      const quantity = parseInt(input, 10);
      if (!isNaN(quantity)) {
        updateProduct({ slug, data: { stock_quantity: quantity } }, {
          onSuccess: () => toast.success('Stock updated successfully'),
          onError: () => toast.error('Failed to update stock')
        });
      }
    }
  };

  const handleMarkOffline = (slug: string) => {
    if (confirm('Are you sure you want to mark this product as offline?')) {
      updateProduct({ slug, data: { is_active: false } }, {
        onSuccess: () => toast.success('Product marked offline'),
        onError: () => toast.error('Failed to mark offline')
      });
    }
  };

  const getStockStatus = (prod: any) => {
    if (prod.stock_quantity === 0) return 'Out of Stock';
    if (prod.stock_quantity <= (prod.low_stock_threshold || 5)) return 'Low Stock';
    return 'In Stock';
  };

  const getHealth = (prod: any) => {
    if (prod.stock_quantity === 0) return 0;
    const threshold = prod.low_stock_threshold || 5;
    const ratio = prod.stock_quantity / threshold;
    if (ratio <= 1) return Math.round(ratio * 60 + 20); // 20-80% for low stock
    return Math.min(100, Math.round(80 + (ratio / 10) * 20)); // 80-100% for good stock
  };

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
            <Link to="/shop" className="text-primary text-xs font-bold hover:underline">View All Products</Link>
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
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                      <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  ))
                ) : (
                  products.map((prod: any, i: number) => {
                    const status = getStockStatus(prod);
                    const health = getHealth(prod);
                    return (
                      <tr key={prod.id || i} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{prod.name}</div>
                          <div className="text-[10px] text-gray-400 flex items-center">
                            <MapPin className="h-2.5 w-2.5 mr-1" /> {prod.location || 'Main Warehouse'}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary">{prod.stock_quantity} units</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${health > 90 ? 'bg-emerald-500' : health > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                style={{ width: `${health}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500">{health}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-black uppercase ${
                            status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                            status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                              status === 'In Stock' ? 'bg-emerald-500' : 
                              status === 'Low Stock' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                            }`}></span>
                            {status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative group/menu">
                            <button className="p-1 hover:bg-gray-100 rounded-lg text-gray-400">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-xl py-2 invisible group-hover/menu:visible z-30 transition-all opacity-0 group-hover/menu:opacity-100 scale-95 group-hover/menu:scale-100">
                              <Link to={`/dashboard/products/${prod.slug}/edit`} className="block w-full text-left px-4 py-2 text-[10px] font-bold text-gray-700 hover:bg-gray-50">Edit Product</Link>
                              <button onClick={() => handleRestock(prod.slug, prod.stock_quantity)} className="w-full text-left px-4 py-2 text-[10px] font-bold text-gray-700 hover:bg-gray-50 font-sand">Restock</button>
                              <button onClick={() => handleMarkOffline(prod.slug)} className="w-full text-left px-4 py-2 text-[10px] font-bold text-rose-600 hover:bg-rose-50">Mark Offline</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
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
