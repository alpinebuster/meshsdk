#pragma once

#include <string>
#include <type_traits>
#include <type_traits>

#include <MRPch/MRWasm.h>

#include <MRMesh/MRMeshFwd.h>
#include <MRMesh/MRAffineXf3.h>
#include <MRMesh/MRId.h>
#include <MRMesh/MRBuffer.h>
#include <MRMesh/MRColor.h>
#include <MRMesh/MRDipole.h>
#include <MRMesh/MRVector.h>
#include <MRMesh/MRVector2.h>
#include <MRMesh/MRVector3.h>
#include <MRMesh/MRVector4.h>

using namespace emscripten;
using namespace MR;


namespace MRJS
{

// NOTE:
// 
// 1) `.constructor` is `template<class... Args> class_& constructor();`
// It is a template member function itself, so it must be used as `.template constructor<>()`
// 
// 2) `.function` is `class_& function( const char*, F )`
// It is a regular member function (not a template!)
// 
template<typename VecType, typename I>
auto bindTypedVector( const std::string& className )
{
    auto cls = class_<VecType>( className.c_str() )
        .template constructor<>()
        .template constructor<size_t, const typename VecType::value_type &>()

        .function( "size", &VecType::size )
        .function( "empty", &VecType::empty )
        .function( "clear", &VecType::clear )
        .function( "capacity", &VecType::capacity )
        .function( "reserve", &VecType::reserve )

        .function( "resizeWithValue", select_overload<void( size_t, const typename VecType::value_type & )>( &VecType::resize ) )
        .function( "resizeWithReserveAndValue", select_overload<void( size_t, const typename VecType::value_type & )>( &VecType::resizeWithReserve ) )

        .function( "get", select_overload<const typename VecType::const_reference & ( I ) const>( &VecType::operator[] ) )
        .function( "set", select_overload<typename VecType::reference & ( I )>( &VecType::operator[] ))
        .function( "getByIndex", select_overload<const typename VecType::value_type & ( I ) const>( &VecType::operator[] ) )
        .function( "getByIndexMutable", select_overload<typename VecType::value_type & ( I )>( &VecType::operator[] ), allow_raw_pointers() )
        .function( "getAt", optional_override( [] ( const VecType& self, I i ) -> typename VecType::value_type
        {
            if ( i >= self.size() ) throw std::out_of_range(
                "Index out of range: " +
                std::to_string( int( i ) ) + " >= " + std::to_string( self.size() )
            );
            return self[i];
        } ) )
        .function( "setAt", optional_override( [] ( VecType& self, I i, typename VecType::value_type value ) -> bool
        {
            if ( i >= self.size() ) throw std::out_of_range(
                "Index out of range: " +
                std::to_string( int( i ) ) + " >= " + std::to_string( self.size() )
            );
            self[i] = value;
            return true;
        } ) )

        .function( "frontConst", select_overload<const typename VecType::const_reference & () const>( &VecType::front ) )
        .function( "front", select_overload<typename VecType::reference & ()>( &VecType::front ) )
        .function( "backConst", select_overload<const typename VecType::const_reference & () const>( &VecType::back ) )
        .function( "back", select_overload<typename VecType::reference & ()>( &VecType::back ) )

        .function( "pushBack", select_overload<void( const typename VecType::value_type & )>( &VecType::push_back ) )
        .function( "popBack", &VecType::pop_back )
        // HACK: `template`
        .function( "emplaceBack", &VecType::template emplace_back<typename VecType::value_type> )

        .function( "beginId", &VecType::beginId )
        .function( "backId", &VecType::backId )
        .function( "endId", &VecType::endId )

        .function( "autoResizeSetWithRange", select_overload<void( I, size_t, typename VecType::value_type )>( &VecType::autoResizeSet ) )
        .function( "autoResizeSet", select_overload<void( I, typename VecType::value_type )>( &VecType::autoResizeSet ) )

        .function( "swap", &VecType::swap )

        .function( "heapBytes", &VecType::heapBytes )
        // FIXME: Handle `VecType::value_type*` properly
        // .function( "data", select_overload<typename VecType::value_type* ()>( &VecType::data ), allow_raw_pointers() )
        // .function( "dataConst", select_overload<const typename VecType::value_type* () const>( &VecType::data ), allow_raw_pointers() )        
        // .function( "getData", optional_override( [] ( VecType& self )
        // {
        //     return val( typed_memory_view( self.size(), self.data() ) );
        // }))
        // .function( "getDataConst", optional_override( [] ( const VecType& self )
        // {
        //     return val( typed_memory_view( self.size(), self.data() ) );
        // }))
        ;

    // If the element type supports `==/!=`, then register `equals`/`notEquals`
    if constexpr ( std::equality_comparable<typename VecType::value_type> )
    {
        cls.function( "equals", optional_override( [] ( const VecType& a, const VecType& b )
        {
            return a == b;
        } ) );
        cls.function( "notEquals", optional_override( [] ( const VecType& a, const VecType& b )
        {
            return a != b;
        } ) );
    }

    if constexpr ( std::default_initializable<typename VecType::value_type> )
    {
        cls.template constructor<size_t>();
        cls.function( "resize", select_overload<void ( size_t )>( &VecType::resize ) )
           .function( "resizeWithReserve", select_overload<void( size_t )>( &VecType::resizeWithReserve ) )
           .function( "autoResizeAt", &VecType::autoResizeAt, allow_raw_pointers() );
    }

	return cls;
}


template<typename Vec2Type>
auto bindTypedVector2( const std::string& className )
{
    auto cls = class_<Vec2Type>( className.c_str() )
        .template smart_ptr<std::shared_ptr<Vec2Type>>( ( className + "SharedPtr" ).c_str() )

        .template constructor<>()
        .template constructor<typename Vec2Type::ValueType, typename Vec2Type::ValueType>()
        .template constructor<const Vec2Type&>()

        .property( "x", &Vec2Type::x )
        .property( "y", &Vec2Type::y )

        .function( "length", &Vec2Type::length )
        .function( "lengthSq", &Vec2Type::lengthSq )
        .function( "get", select_overload<const typename Vec2Type::ValueType& ( int ) const>( &Vec2Type::operator[] ) )
        .function( "set", select_overload<typename Vec2Type::ValueType& ( int )>( &Vec2Type::operator[] ) )

        .class_function( "diagonal", &Vec2Type::diagonal )
        .class_function( "plusX", &Vec2Type::plusX )
        .class_function( "plusY", &Vec2Type::plusY )
        .class_function( "minusX", &Vec2Type::minusX )
        .class_function( "minusY", &Vec2Type::minusY );

	// `perpendicular()` and `furthestBasisVector()` are not defined for `bool`
	if constexpr ( !std::is_same_v<typename Vec2Type::ValueType, bool> )
	{
		cls.function( "perpendicular", &Vec2Type::perpendicular )
		   .function( "furthestBasisVector", &Vec2Type::furthestBasisVector );
	}
    if constexpr ( !std::is_integral_v<typename Vec2Type::ValueType> )
    {
        cls.function( "normalized", &Vec2Type::normalized );
	}
    if constexpr ( std::is_floating_point_v<typename Vec2Type::ValueType> )
    {
        cls.function( "isFinite", &Vec2Type::isFinite );
	}

	return cls;
}


template<typename Vec3Type>
auto bindTypedVector3( const std::string& name, const std::string& suffix )
{
    using T = Vec3Type::ValueType;

    auto cls = class_<Vec3Type>( name.c_str() )
        .template smart_ptr<std::shared_ptr<Vec3Type>>( ( name + "SharedPtr" ).c_str() )

        .template constructor<>()
        .template constructor<T, T, T>()
        .class_function( "createFromVector2", optional_override( [] ( Vector2<T> v2 )
        {
            return Vec3Type( v2 );
        } ) )

        .property( "x", &Vec3Type::x )
        .property( "y", &Vec3Type::y )
        .property( "z", &Vec3Type::z )

        .function( "lengthSq", &Vec3Type::lengthSq )
        .function( "length", &Vec3Type::length )
        .function( "get", select_overload<const T & ( int ) const>( &Vec3Type::operator[] ) )
        .function( "set", select_overload<T & ( int )>( &Vec3Type::operator[] ) )

        .class_function( "diagonal", &Vec3Type::diagonal )
        .class_function( "plusX", &Vec3Type::plusX )
        .class_function( "plusY", &Vec3Type::plusY )
        .class_function( "plusZ", &Vec3Type::plusZ )
        .class_function( "minusX", &Vec3Type::minusX )
        .class_function( "minusY", &Vec3Type::minusY )
        .class_function( "minusZ", &Vec3Type::minusZ );

    // `float`, `double`, and `long double` are all considered floating-point types.
    // Therefore, for these three types, `std::is_floating_point_v<T>` will be `true`, while `int` and `bool` will be `false`.
    if constexpr ( std::is_floating_point_v<T> )
    {
        cls.function( "normalized", &Vec3Type::normalized )
           .function( "perpendicular", &Vec3Type::perpendicular )
           // .function( "transformed", &Vec3Type::transformed, allow_raw_pointers() )
           .function( "unsignZeroValues", &Vec3Type::unsignZeroValues )
           .function( "isFinite", &Vec3Type::isFinite );

        function( ( "unitVector3" + suffix ).c_str(), select_overload<Vec3Type( T, T )>( &unitVector3<T> ) );
    }

    // `std::is_integral_v<T>` returns `true` for integral types (such as `int`, `long`, `short`, `char`, `bool`, etc.)
    if constexpr ( std::is_integral_v<T> )
    {
        // NOTE: For integer vectors:
        // 
        // `normalized()`, `furthestBasisVector()`, 
        // `perpendicular()`, `unsignZeroValues()` and `isFinite()` is not working
        // 
        cls
        .function( "normalized",
            optional_override( [] ( const Vec3Type& self ) -> Vector3f
            {
                return Vector3f( static_cast< float >( self.x ), static_cast< float >( self.y ), static_cast< float >( self.z ) ).normalized();
            } )
        )
        .function( "perpendicular",
            optional_override( [] ( const Vec3Type& self ) -> std::pair<Vector3f, Vector3f>
            {
                Vector3f floatVec(
                    static_cast< float >( self.x ),
                    static_cast< float >( self.y ),
                    static_cast< float >( self.z )
                );
                return floatVec.perpendicular();
            } )
        )
        // .function( "transformed",
        //     optional_override( [] ( Vec3Type& self, const AffineXf3f* xf ) -> Vector3f
        //     {
        //         Vector3f floatVec(
        //             static_cast< float >( self.x ),
        //             static_cast< float >( self.y ),
        //             static_cast< float >( self.z )
        //         );
        //         return floatVec.transformed( xf );
        //     } ),
        //     allow_raw_pointers()
        // )
        .function( "unsignZeroValues",
            optional_override( [] ( Vec3Type& self ) -> Vector3f
            {
                Vector3f floatVec(
                    static_cast< float >( self.x ),
                    static_cast< float >( self.y ),
                    static_cast< float >( self.z )
                );
                // 
                // NOTE: Convert back to integers will truncate any fractional parts
                // 
                // self.x = static_cast<int>( floatVec.x );
                // self.y = static_cast<int>( floatVec.y );
                // self.z = static_cast<int>( floatVec.z );
                // 
                floatVec.unsignZeroValues();
                return floatVec;
            } )
        )
        .function( "isFinite", optional_override( [] ( Vec3Type& self ) -> bool
            {
                Vector3f floatVec( static_cast< float >( self.x ), static_cast< float >( self.y ), static_cast< float >( self.z ) );
                return floatVec.isFinite();
            } )
        );

        function( ( "unitVector3" + suffix ).c_str(),
            optional_override( [] ( T x, T y ) -> Vector3f
            {
                float dx = static_cast<float>( x );
                float dy = static_cast<float>( y );
                return unitVector3( dx, dy );
            } )
        );
    }

    if constexpr ( !std::is_same_v<T, bool> )
    {
        cls.function( "furthestBasisVector", &Vec3Type::furthestBasisVector );
    
        function( ( "distanceSq3" + suffix ).c_str(), select_overload<T( const Vec3Type&, const Vec3Type& )>( &distanceSq<T> ) );
        function( ( "distance3" + suffix ).c_str(), select_overload<T( const Vec3Type&, const Vec3Type& )>( &distance<T> ) );
        function( ( "cross3" + suffix ).c_str(), select_overload<Vec3Type( const Vec3Type&, const Vec3Type& )>( &cross<T> ) );
        function( ( "dot3" + suffix ).c_str(), select_overload<T( const Vec3Type&, const Vec3Type& )>( &dot<T> ) );
        function( ( "sqr3" + suffix ).c_str(), select_overload<T( const Vec3Type& )>( &sqr<T> ) );
        function( ( "mixed3" + suffix ).c_str(), select_overload<T( const Vec3Type&, const Vec3Type&, const Vec3Type& )>( &mixed<T> ) );
        function( ( "mult3" + suffix ).c_str(), select_overload<Vec3Type( const Vec3Type&, const Vec3Type& )>( &mult<T> ) );
        function( ( "div3" + suffix ).c_str(), select_overload<Vec3Type( const Vec3Type&, const Vec3Type& )>( &div<T> ) );
        function( ( "angle3" + suffix ).c_str(), select_overload<T( const Vec3Type&, const Vec3Type& )>( &angle<T> ) );
    }

    return cls;
}


template<typename Vec4Type>
auto bindTypedVector4( const std::string& name, const std::string& suffix )
{
    using T = Vec4Type::ValueType;

    auto cls = class_<Vec4Type>( name.c_str() )
        .template smart_ptr<std::shared_ptr<Vec4Type>>( ( name + "SharedPtr" ).c_str() )
        .template constructor<>()
        .template constructor<T, T, T, T>()

        .property( "x", &Vec4Type::x )
        .property( "y", &Vec4Type::y )
        .property( "z", &Vec4Type::z )
        .property( "w", &Vec4Type::w )

        .class_function( "diagonal", &Vec4Type::diagonal )

        .function( "get", select_overload<const T & ( int ) const>( &Vec4Type::operator[] ) )
        .function( "set", select_overload<T & ( int )>( &Vec4Type::operator[] ) )

        .function( "lengthSq", &Vec4Type::lengthSq )
        .function( "length", &Vec4Type::length );


    if constexpr ( std::is_floating_point_v<T> )
    {
        cls.function( "isFinite", &Vec4Type::isFinite );
    }

    if constexpr ( !std::is_integral_v<T> )
    {
        cls.function( "proj3d", &Vec4Type::proj3d )
           .function( "normalized", &Vec4Type::normalized );
    }

    if constexpr ( !std::is_same_v<T, bool> )
    {
        function( ( "dot4" + suffix ).c_str(), select_overload<T ( const Vec4Type&, const Vec4Type& )>( &dot<T> ) );
        function( ( "mult4" + suffix ).c_str(), select_overload<Vec4Type( const Vec4Type&, const Vec4Type& )>( &mult<T> ) );
        function( ( "div4" + suffix ).c_str(), select_overload<Vec4Type( const Vec4Type&, const Vec4Type& )>( &div<T> ) );
    }

    function( ( "distanceSq4" + suffix ).c_str(), select_overload<T( const Vec4Type&, const Vec4Type& )>( &distanceSq<T> ) );
    function( ( "distance4" + suffix ).c_str(), select_overload<T( const Vec4Type&, const Vec4Type& )>( &distance<T> ) );
    function( ( "sqr4" + suffix ).c_str(), select_overload<T( const Vec4Type& )>( &sqr<T> ) );

    return cls;
}

}
