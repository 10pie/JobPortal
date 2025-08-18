# Deployment Guide

## Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account
- GitHub account
- Hosting platform account (Render, Railway, Vercel, Netlify)

## Environment Setup

### Backend Environment Variables
Create `.env` file in Backend directory:

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=8000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://yourapp.netlify.app
```

### Frontend Environment Variables
Create `.env` file in Frontend directory:

```env
VITE_API_BASE_URL=https://your-backend-url.render.com/api/v1
```

## MongoDB Atlas Setup

1. **Create Account & Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free account
   - Create new cluster (M0 free tier)

2. **Database Configuration**
   - Create database user with read/write permissions
   - Add your IP to whitelist (0.0.0.0/0 for all IPs in production)
   - Get connection string

3. **Connection String Format**
   ```
   mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>
   ```

## Cloudinary Setup

1. **Create Account**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   - Add to environment variables

3. **Configure Upload Settings**
   - Set folder structure: `/job-portal/logos`
   - Configure image transformations

## Backend Deployment (Render)

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com/)
   - Create new Web Service
   - Connect GitHub repository
   - Set root directory to `Backend`
   - Build command: `npm install`
   - Start command: `npm start`

3. **Environment Variables on Render**
   - Add all environment variables from `.env`
   - Set `NODE_ENV=production`

4. **Add Build Script to package.json**
   ```json
   {
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js",
       "build": "npm install"
     }
   }
   ```

## Frontend Deployment (Netlify)

1. **Build for Production**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Update API URLs**
   - Update `src/utils/Constant.js`:
   ```javascript
   export const USER_API_ENDPOINT = "https://your-backend-url.render.com/api/v1/user";
   export const JOB_API_ENDPOINT = "https://your-backend-url.render.com/api/v1/job";
   export const COMPANY_API_ENDPOINT = "https://your-backend-url.render.com/api/v1/company";
   export const APPLICATION_API_ENDPOINT = "https://your-backend-url.render.com/api/v1/application";
   ```

3. **Deploy on Netlify**
   - Go to [Netlify](https://netlify.com/)
   - Drag and drop `dist` folder OR connect GitHub
   - Set build directory to `Frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Configure Redirects**
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

## Alternative Deployment Options

### Backend - Railway
1. Connect GitHub repository
2. Set root directory to `Backend`
3. Add environment variables
4. Deploy automatically

### Frontend - Vercel
1. Import GitHub repository
2. Set framework to Vite
3. Set root directory to `Frontend`
4. Add environment variables
5. Deploy

## Domain & SSL

### Custom Domain (Optional)
1. **Purchase Domain** from provider like Namecheap, GoDaddy
2. **Configure DNS** to point to hosting platform
3. **Enable SSL** (usually automatic on modern platforms)

### Subdomain Setup
- Backend: `api.yourdomain.com`
- Frontend: `yourdomain.com` or `app.yourdomain.com`

## Post-Deployment Checklist

### Backend Verification
- [ ] API endpoints respond correctly
- [ ] Database connection works
- [ ] File uploads work
- [ ] Authentication flows work
- [ ] CORS is configured properly

### Frontend Verification
- [ ] All pages load correctly
- [ ] API calls work
- [ ] Authentication redirects properly
- [ ] File uploads work
- [ ] Search functionality works
- [ ] Responsive design works

### Testing Checklist
- [ ] User registration
- [ ] User login/logout
- [ ] Job posting (recruiter)
- [ ] Job application (student)
- [ ] Company creation
- [ ] Profile updates
- [ ] Search functionality
- [ ] File uploads

## Monitoring & Maintenance

### Error Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor server logs
- Set up uptime monitoring

### Performance Monitoring
- Monitor API response times
- Check database performance
- Monitor CDN performance

### Regular Updates
- Update dependencies regularly
- Monitor security vulnerabilities
- Backup database regularly

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL in backend environment
   - Verify axios withCredentials setting

2. **Database Connection Issues**
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format
   - Ensure database user has proper permissions

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper Content-Type headers

4. **Authentication Issues**
   - Check JWT_SECRET consistency
   - Verify cookie settings
   - Check token expiration

### Log Analysis
```bash
# Backend logs (Render)
render logs

# Frontend logs (Netlify)
netlify logs

# Database logs (MongoDB Atlas)
Check Atlas monitoring dashboard
```

## Scaling Considerations

### Database Scaling
- Monitor connection limits
- Consider MongoDB Atlas auto-scaling
- Implement connection pooling

### Backend Scaling
- Use horizontal scaling
- Implement load balancing
- Consider microservices architecture

### Frontend Scaling
- Use CDN for static assets
- Implement code splitting
- Optimize bundle size

### Caching Strategy
- Implement Redis for session storage
- Use CDN caching
- Cache frequently accessed data

## Security Best Practices

### Production Security
- Use strong JWT secrets
- Implement rate limiting
- Validate all user inputs
- Use HTTPS only
- Regular security audits

### Environment Variables
- Never commit `.env` files
- Use different secrets for different environments
- Rotate secrets regularly

### Database Security
- Use strong passwords
- Limit IP access
- Enable MongoDB Atlas security features
- Regular backups

This deployment guide should help you successfully deploy your job portal application to production!
