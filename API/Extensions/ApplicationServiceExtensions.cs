using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure.Interfaces;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection serviceCollection,
            IConfiguration config)
        {
            serviceCollection.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "API", Version = "v1"});
            });

            serviceCollection.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            serviceCollection.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy",
                    policy =>
                    {
                        policy
                            .WithOrigins("http://localhost:3000")
                            .SetIsOriginAllowed((host) => true)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            serviceCollection.AddMediatR(typeof(List.Handler).Assembly);

            serviceCollection.AddAutoMapper(typeof(MappingProfile).Assembly);

            serviceCollection.AddScoped<IUserAccessor, UserAccessor>();

            serviceCollection.AddScoped<IPhotoAccessor, PhotoAccessor>();

            serviceCollection.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            
            return serviceCollection;
        }
    }
}