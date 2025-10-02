import { useState } from 'react';
import { Download, ExternalLink, FileText, BookOpen, Database, Globe, Search, Users, Shield, Zap, Satellite, Rocket, Star, Moon, Sun, Archive } from 'lucide-react';

export default function Data() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const documents = [
        {
            id: 1,
            title: "SPD-41a: Scientific Information Policy for the Science Mission Directorate",
            description: "The foundational policy document that establishes the framework for scientific information management across NASA's Science Mission Directorate.",
            category: "policy",
            url: "https://science.nasa.gov/wp-content/uploads/2023/10/helio-data-library-strategy-final-tagged.pdf",
            icon: Shield,
            type: "Policy Document",
            size: "2.1 MB",
            date: "2023"
        },
        {
            id: 2,
            title: "Heliophysics Science Data Management Policy",
            description: "Describes the requirements and specifications for how scientific information from HPD-sponsored science programs is shared.",
            category: "policy",
            url: "https://assets.science.nasa.gov/content/dam/science/hpd/key-documents/2025/HPD_Data_Policy_v2_2_Final.pdf",
            icon: Database,
            type: "Policy Document",
            size: "1.8 MB",
            date: "2025"
        },
        {
            id: 3,
            title: "Heliophysics Data Management Handbook",
            description: "Details how scientific information from the science programs sponsored by NASA's Heliophysics Division (HPD) is shared and managed, and its scope encompasses all phases of the mission and research data life cycles.",
            category: "handbook",
            url: "https://assets.science.nasa.gov/content/dam/science/hpd/data/2024/HPD_Data_Management_Handbook_FINAL1_Tagged.pdf",
            icon: BookOpen,
            type: "Handbook",
            size: "3.2 MB",
            date: "2024"
        },
        {
            id: 4,
            title: "Heliophysics Archiving Strategy",
            description: "Describes the goals and objectives of the continuous effort to evolve the HDRL to meet the needs of the research community.",
            category: "strategy",
            url: "https://assets.science.nasa.gov/content/dam/science/hpd/key-documents/2025/HPD_Data_Policy_v2_2_Final.pdf",
            icon: Archive,
            type: "Strategy Document",
            size: "2.5 MB",
            date: "2025"
        },
        {
            id: 5,
            title: "NASA Open Data Policy Framework",
            description: "Comprehensive framework for implementing open data principles across NASA missions and research programs.",
            category: "policy",
            url: "#",
            icon: Globe,
            type: "Policy Document",
            size: "1.5 MB",
            date: "2024"
        },
        {
            id: 6,
            title: "Space Weather Data Standards",
            description: "Technical standards and specifications for space weather data collection, processing, and distribution.",
            category: "standards",
            url: "#",
            icon: Zap,
            type: "Technical Standards",
            size: "2.8 MB",
            date: "2024"
        },
        {
            id: 7,
            title: "Aurora Research Data Collection Protocol",
            description: "Detailed protocols for collecting, processing, and archiving aurora observation data from ground and space-based instruments.",
            category: "protocol",
            url: "#",
            icon: Star,
            type: "Research Protocol",
            size: "1.9 MB",
            date: "2024"
        },
        {
            id: 8,
            title: "Solar Wind Data Processing Guidelines",
            description: "Guidelines for processing and analyzing solar wind data from various spacecraft missions and ground-based observatories.",
            category: "guidelines",
            url: "#",
            icon: Sun,
            type: "Processing Guidelines",
            size: "2.3 MB",
            date: "2024"
        },
        {
            id: 9,
            title: "Magnetosphere Data Archive Standards",
            description: "Standards for archiving magnetosphere data including format specifications, metadata requirements, and quality control procedures.",
            category: "standards",
            url: "#",
            icon: Satellite,
            type: "Archive Standards",
            size: "3.1 MB",
            date: "2024"
        },
        {
            id: 10,
            title: "Space Mission Data Lifecycle Management",
            description: "Comprehensive guide for managing data throughout the entire lifecycle of space missions from planning to archival.",
            category: "handbook",
            url: "#",
            icon: Rocket,
            type: "Management Guide",
            size: "4.2 MB",
            date: "2024"
        },
        {
            id: 11,
            title: "Ionosphere Research Data Requirements",
            description: "Requirements and specifications for ionosphere research data including measurement standards and validation procedures.",
            category: "requirements",
            url: "#",
            icon: Moon,
            type: "Research Requirements",
            size: "2.7 MB",
            date: "2024"
        },
        {
            id: 12,
            title: "Multi-Mission Data Integration Protocol",
            description: "Protocols for integrating data from multiple space missions to create comprehensive datasets for heliophysics research.",
            category: "protocol",
            url: "#",
            icon: Database,
            type: "Integration Protocol",
            size: "2.9 MB",
            date: "2024"
        },
        {
            id: 13,
            title: "Data Quality Assurance Framework",
            description: "Framework for ensuring data quality across all heliophysics data products including validation, verification, and quality metrics.",
            category: "framework",
            url: "#",
            icon: Shield,
            type: "Quality Framework",
            size: "2.4 MB",
            date: "2024"
        },
        {
            id: 14,
            title: "Public Data Access Guidelines",
            description: "Guidelines for providing public access to NASA heliophysics data including user interfaces, APIs, and documentation requirements.",
            category: "guidelines",
            url: "#",
            icon: Users,
            type: "Access Guidelines",
            size: "1.7 MB",
            date: "2024"
        },
        {
            id: 15,
            title: "Research Data Citation Standards",
            description: "Standards for citing heliophysics research data in scientific publications including DOI assignment and citation formats.",
            category: "standards",
            url: "#",
            icon: FileText,
            type: "Citation Standards",
            size: "1.3 MB",
            date: "2024"
        }
    ];

    const categories = [
        { id: 'all', name: 'All Documents', count: documents.length },
        { id: 'policy', name: 'Policy Documents', count: documents.filter(doc => doc.category === 'policy').length },
        { id: 'handbook', name: 'Handbooks', count: documents.filter(doc => doc.category === 'handbook').length },
        { id: 'standards', name: 'Standards', count: documents.filter(doc => doc.category === 'standards').length },
        { id: 'guidelines', name: 'Guidelines', count: documents.filter(doc => doc.category === 'guidelines').length },
        { id: 'protocol', name: 'Protocols', count: documents.filter(doc => doc.category === 'protocol').length },
        { id: 'framework', name: 'Frameworks', count: documents.filter(doc => doc.category === 'framework').length },
        { id: 'requirements', name: 'Requirements', count: documents.filter(doc => doc.category === 'requirements').length }
    ];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDownload = (url, title) => {
        if (url === '#') {
            alert('This document is currently being prepared and will be available soon.');
            return;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 text-white">
            {/* Animated particles background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 3}s`
                        }}
                    />
                ))}
                {/* Floating document particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`document-${i}`}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 pt-20">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 px-4 pt-10">
                    <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-yellow-400 to-teal-400 rounded-full blur-md opacity-15 animate-pulse"></div>
                        <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
                            <span className="bg-gradient-to-r from-cyan-200 via-yellow-200 to-teal-200 bg-clip-text text-transparent">
                                📚 NASA Documents On Heliophysics 📚
                            </span>
                        </h1>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl text-cyan-200 max-w-4xl mx-auto font-semibold">
                        Access important NASA heliophysics data policies, handbooks, standards, and guidelines
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-cyan-400/30 rounded-lg text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.id
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                    : 'bg-white/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-white'
                                    }`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocuments.map((doc) => {
                        const IconComponent = doc.icon;
                        return (
                            <div
                                key={doc.id}
                                className="bg-gradient-to-br from-slate-800/30 via-cyan-900/20 to-teal-800/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-cyan-500/20 rounded-lg">
                                        <IconComponent className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                            {doc.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                                                {doc.type}
                                            </span>
                                            <span className="text-cyan-400 text-xs">{doc.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-cyan-100 text-sm mb-4 line-clamp-3">
                                    {doc.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-cyan-300">
                                        {doc.size}
                                    </div>
                                    <button
                                        onClick={() => handleDownload(doc.url, doc.title)}
                                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results */}
                {filteredDocuments.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-cyan-300 mb-2">No documents found</h3>
                        <p className="text-cyan-400">Try adjusting your search terms or category filter</p>
                    </div>
                )}

                {/* Footer Info */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-br from-slate-800/30 via-cyan-900/20 to-teal-800/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10">
                        <h3 className="text-2xl font-bold text-cyan-300 mb-4">About NASA Data Documents</h3>
                        <p className="text-cyan-100 max-w-4xl mx-auto leading-relaxed">
                            These documents represent NASA's commitment to open science and data accessibility.
                            They provide essential guidance for researchers, educators, and the public on how
                            NASA manages, shares, and preserves heliophysics data. All documents are freely
                            available and follow NASA's open data policies to promote scientific discovery and
                            public engagement with space science.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-cyan-400">
                            <span className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Open Access
                            </span>
                            <span className="flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Public Domain
                            </span>
                            <span className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Community Driven
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
