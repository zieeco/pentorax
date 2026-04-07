-- STEP 2: After running 'python manage.py migrate', run this SQL in Supabase:

-- Add indexes for better query performance on quotes
CREATE INDEX IF NOT EXISTS idx_quotes_request_status ON public.quotes_quoterequest(status);
CREATE INDEX IF NOT EXISTS idx_quotes_request_email ON public.quotes_quoterequest(email);

-- Add indexes for better query performance on warranty
CREATE INDEX IF NOT EXISTS idx_warranty_serial ON public.warranty_warrantycheck(serial_number);
CREATE INDEX IF NOT EXISTS idx_warranty_expiry ON public.warranty_warrantycheck(expiry_date);
CREATE INDEX IF NOT EXISTS idx_warranty_email ON public.warranty_warrantycheck(customer_email);

-- Add indexes for better query performance on contacts
CREATE INDEX IF NOT EXISTS idx_contacts_submission_is_read ON public.contacts_contactsubmission(is_read);
CREATE INDEX IF NOT EXISTS idx_contacts_submission_email ON public.contacts_contactsubmission(email);

-- Add indexes for better query performance on support
CREATE INDEX IF NOT EXISTS idx_support_ticket_status ON public.support_supportticket(status);
CREATE INDEX IF NOT EXISTS idx_support_ticket_serial ON public.support_supportticket(serial_number);
CREATE INDEX IF NOT EXISTS idx_support_ticket_email ON public.support_supportticket(user_email);

-- Add FK from blog_post to blog_category
ALTER TABLE public.blog_blogpost
ADD CONSTRAINT blog_blogpost_category_id_fkey
FOREIGN KEY (category_id) REFERENCES public.blog_blogcategory(id) ON DELETE SET NULL;

-- Add indexes for blog
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_category_id ON public.blog_blogpost(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_published_at ON public.blog_blogpost(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_is_published ON public.blog_blogpost(is_published);

-- Add FK from user_profile to auth.users (supabase_id references auth.users.id)
ALTER TABLE public.core_userprofile
ADD CONSTRAINT core_userprofile_supabase_id_fkey
FOREIGN KEY (supabase_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add indexes for user profile (role index added for permission checks)
CREATE INDEX IF NOT EXISTS idx_core_userprofile_supabase_id ON public.core_userprofile(supabase_id);
CREATE INDEX IF NOT EXISTS idx_core_userprofile_email ON public.core_userprofile(email);
CREATE INDEX IF NOT EXISTS idx_core_userprofile_role ON public.core_userprofile(role);

-- Add self-referencing FK for category parent
ALTER TABLE public.products_category
ADD CONSTRAINT products_category_parent_id_fkey
FOREIGN KEY (parent_id) REFERENCES public.products_category(id) ON DELETE SET NULL;

-- Add FK from product to category
ALTER TABLE public.products_product
ADD CONSTRAINT products_product_category_id_fkey
FOREIGN KEY (category_id) REFERENCES public.products_category(id) ON DELETE RESTRICT;

-- Add FK from product images to product
ALTER TABLE public.products_productimage
ADD CONSTRAINT products_productimage_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE CASCADE;

-- Add FK from product specifications to product
ALTER TABLE public.products_productspecification
ADD CONSTRAINT products_productspecification_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE CASCADE;

-- Add indexes for better performance on products
CREATE INDEX IF NOT EXISTS idx_products_product_slug ON public.products_product(slug);
CREATE INDEX IF NOT EXISTS idx_products_product_is_active ON public.products_product(is_active);
CREATE INDEX IF NOT EXISTS idx_products_product_is_featured ON public.products_product(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON public.products_category(slug);

-- Add FK from review to product
ALTER TABLE public.reviews_review
ADD CONSTRAINT reviews_review_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE CASCADE;

-- Add check constraint for rating (1-5)
ALTER TABLE public.reviews_review
ADD CONSTRAINT reviews_review_rating_check CHECK (rating >= 1 AND rating <= 5);

-- Add indexes for better performance on reviews
CREATE INDEX IF NOT EXISTS idx_reviews_review_product_id ON public.reviews_review(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_review_rating ON public.reviews_review(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_review_created_at ON public.reviews_review(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_review_user_id ON public.reviews_review(user_id);

-- Add FK from stock to product (one-to-one relationship)
ALTER TABLE public.inventory_stock
ADD CONSTRAINT inventory_stock_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE CASCADE;

-- Add check constraints for inventory
ALTER TABLE public.inventory_stock
ADD CONSTRAINT inventory_stock_quantity_check CHECK (quantity >= 0);

ALTER TABLE public.inventory_stock
ADD CONSTRAINT inventory_stock_reserved_check CHECK (reserved >= 0);

-- Add index for inventory queries
CREATE INDEX IF NOT EXISTS idx_inventory_stock_product_id ON public.inventory_stock(product_id);

-- Add FK from cart to auth.users
ALTER TABLE public.cart_cart
ADD CONSTRAINT cart_cart_user_id_fkey
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add FK from cart_item to cart
ALTER TABLE public.cart_cartitem
ADD CONSTRAINT cart_cartitem_cart_id_fkey
FOREIGN KEY (cart_id) REFERENCES public.cart_cart(id) ON DELETE CASCADE;

-- Add FK from cart_item to product
ALTER TABLE public.cart_cartitem
ADD CONSTRAINT cart_cartitem_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE CASCADE;

-- Add indexes for better performance on cart
CREATE INDEX IF NOT EXISTS idx_cart_cart_user_id ON public.cart_cart(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_cartitem_cart_id ON public.cart_cartitem(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_cartitem_product_id ON public.cart_cartitem(product_id);

-- Add FK from order_item to order
ALTER TABLE public.orders_orderitem
ADD CONSTRAINT orders_orderitem_order_id_fkey
FOREIGN KEY (order_id) REFERENCES public.orders_order(id) ON DELETE CASCADE;

-- Add FK from order_item to product
ALTER TABLE public.orders_orderitem
ADD CONSTRAINT orders_orderitem_product_id_fkey
FOREIGN KEY (product_id) REFERENCES public.products_product(id) ON DELETE RESTRICT;

-- Add indexes for better performance on orders
CREATE INDEX IF NOT EXISTS idx_orders_order_user_id ON public.orders_order(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders_order(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_created_at ON public.orders_order(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_orderitem_order_id ON public.orders_orderitem(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_orderitem_product_id ON public.orders_orderitem(product_id);

-- Add FK from payment to order
ALTER TABLE public.payments_payment
ADD CONSTRAINT payments_payment_order_id_fkey
FOREIGN KEY (order_id) REFERENCES public.orders_order(id) ON DELETE CASCADE;

-- Add indexes for better performance on payments
CREATE INDEX IF NOT EXISTS idx_payments_payment_reference ON public.payments_payment(reference);
CREATE INDEX IF NOT EXISTS idx_payments_payment_status ON public.payments_payment(status);
CREATE INDEX IF NOT EXISTS idx_payments_payment_created_at ON public.payments_payment(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_payment_order_id ON public.payments_payment(order_id);


-- Add FK from blog_post to blog_category
ALTER TABLE public.blog_blogpost
ADD CONSTRAINT blog_blogpost_category_id_fkey
FOREIGN KEY (category_id) REFERENCES public.blog_blogcategory(id) ON DELETE SET NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_category_id ON public.blog_blogpost(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_published_at ON public.blog_blogpost(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_is_published ON public.blog_blogpost(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_is_featured ON public.blog_blogpost(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_author_id ON public.blog_blogpost(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_blogpost_slug ON public.blog_blogpost(slug);
CREATE INDEX IF NOT EXISTS idx_blog_blogcategory_slug ON public.blog_blogcategory(slug);
