// Performance monitoring utilities for mobile optimization

class PerformanceMonitor {
	constructor() {
		this.metrics = {};
		this.startTime = performance.now();
		this.isMobile = window.innerWidth <= 768;
	}

	// Mark a performance point
	mark(name) {
		this.metrics[name] = performance.now() - this.startTime;
		console.log(`⏱️ Performance: ${name} - ${this.metrics[name].toFixed(2)}ms`);
	}

	// Measure time between two points
	measure(startName, endName) {
		const start = this.metrics[startName];
		const end = this.metrics[endName];
		
		if (Number.isFinite(start) && Number.isFinite(end)) {
			const duration = end - start;
			console.log(`📊 Performance: ${startName} → ${endName} = ${duration.toFixed(2)}ms`);
			return duration;
		}
		return null;
	}

	// Track image loading performance
	trackImageLoad(src, startTime) {
		const loadTime = performance.now() - startTime;
		console.log(`🖼️ Image loaded: ${src} in ${loadTime.toFixed(2)}ms`);
		
		// Store for analytics
		if (!this.metrics.imageLoads) {
			this.metrics.imageLoads = [];
		}
		this.metrics.imageLoads.push({ src, loadTime });
		
		return loadTime;
	}

	// Track API call performance
	trackApiCall(endpoint, startTime) {
		const responseTime = performance.now() - startTime;
		console.log(`🌐 API call: ${endpoint} in ${responseTime.toFixed(2)}ms`);
		
		// Store for analytics
		if (!this.metrics.apiCalls) {
			this.metrics.apiCalls = [];
		}
		this.metrics.apiCalls.push({ endpoint, responseTime });
		
		return responseTime;
	}

	// Get mobile-specific optimizations
	getMobileOptimizations() {
		return {
			isMobile: this.isMobile,
			connectionType: this.getConnectionType(),
			deviceMemory: navigator.deviceMemory || 'unknown',
			hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
			userAgent: navigator.userAgent
		};
	}

	// Detect connection type
	getConnectionType() {
		if ('connection' in navigator) {
			const connection = navigator.connection;
			return {
				effectiveType: connection.effectiveType || 'unknown',
				downlink: connection.downlink || 'unknown',
				rtt: connection.rtt || 'unknown',
				saveData: connection.saveData || false
			};
		}
		return 'unknown';
	}

	// Generate performance report
	generateReport() {
		const report = {
			timestamp: new Date().toISOString(),
			device: this.getMobileOptimizations(),
			metrics: this.metrics,
			summary: this.generateSummary()
		};

		console.log('📈 Performance Report:', report);
		return report;
	}

	// Generate performance summary
	generateSummary() {
		const summary = {
			totalTime: performance.now() - this.startTime,
			imageLoads: this.metrics.imageLoads?.length || 0,
			apiCalls: this.metrics.apiCalls?.length || 0,
			averageImageLoadTime: this.calculateAverage(this.metrics.imageLoads?.map(i => i.loadTime) || []),
			averageApiResponseTime: this.calculateAverage(this.metrics.apiCalls?.map(a => a.responseTime) || [])
		};

		return summary;
	}

	// Calculate average
	calculateAverage(numbers) {
		if (numbers.length === 0) return 0;
		return numbers.reduce((a, b) => a + b, 0) / numbers.length;
	}

	// Monitor Core Web Vitals
	monitorCoreWebVitals() {
		// Largest Contentful Paint (LCP)
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];
			console.log('🎯 LCP:', lastEntry.startTime);
			this.metrics.lcp = lastEntry.startTime;
		}).observe({ entryTypes: ['largest-contentful-paint'] });

		// First Input Delay (FID)
		new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry) => {
				console.log('⚡ FID:', entry.processingStart - entry.startTime);
				this.metrics.fid = entry.processingStart - entry.startTime;
			});
		}).observe({ entryTypes: ['first-input'] });

		// Cumulative Layout Shift (CLS)
		new PerformanceObserver((list) => {
			let clsValue = 0;
			const entries = list.getEntries();
			entries.forEach((entry) => {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
				}
			});
			console.log('📐 CLS:', clsValue);
			this.metrics.cls = clsValue;
		}).observe({ entryTypes: ['layout-shift'] });
	}

	// Monitor memory usage
	monitorMemory() {
		if ('memory' in performance) {
			const memory = performance.memory;
			console.log('💾 Memory:', {
				used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
				total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
				limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
			});
		}
	}

	// Optimize for slow connections
	optimizeForSlowConnection() {
		const connection = this.getConnectionType();
		
		if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
			console.log('🐌 Slow connection detected, applying optimizations');
			
			// Reduce image quality
			document.documentElement.style.setProperty('--image-quality', '0.5');
			
			// Disable animations
			document.documentElement.style.setProperty('--animation-duration', '0s');
			
			// Reduce API calls
			window.SLOW_CONNECTION = true;
		}
	}
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Initialize monitoring
performanceMonitor.monitorCoreWebVitals();
performanceMonitor.optimizeForSlowConnection();

// Monitor memory usage periodically
setInterval(() => {
	performanceMonitor.monitorMemory();
}, 30000); // Every 30 seconds

export default performanceMonitor;

// Export individual functions for convenience (bound to the singleton to preserve context)
export const mark = performanceMonitor.mark.bind(performanceMonitor);
export const measure = performanceMonitor.measure.bind(performanceMonitor);
export const trackImageLoad = performanceMonitor.trackImageLoad.bind(performanceMonitor);
export const trackApiCall = performanceMonitor.trackApiCall.bind(performanceMonitor);
export const getMobileOptimizations = performanceMonitor.getMobileOptimizations.bind(performanceMonitor);
export const generateReport = performanceMonitor.generateReport.bind(performanceMonitor); 